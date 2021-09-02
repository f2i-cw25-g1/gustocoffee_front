import React, { useEffect, useRef, useState } from "react";
import "./css/Carousel.css";
import axios from "axios";
import Product from "./../components/Product";
import urlApi from '../urlApi';

//appelé dans page Boutique
const AllProducts = () => {
    const [categories, setCategories] = useState([]);
    const documentRef = useRef(null);
    const productsRef = useRef([]);

    documentRef.current = document.getElementById("loadAllProducts");

    useEffect(() => {
        const ourRequest = axios.CancelToken.source();
        let doc = document.getElementById("loadAllProducts");
        //récupération des produits et catégories
        const getAllProducts = async () => {
            try {
                const [requestProducts, requestCategory] = await Promise.all([
                    axios.get(urlApi+`/api/produits`, { cancelToken: ourRequest.token }),
                    axios.get(urlApi+`/api/categories`, { cancelToken: ourRequest.token })
                ]);
                productsRef.current = await requestProducts.data["hydra:member"];
                let responseCategories = await requestCategory.data["hydra:member"];
                responseCategories.forEach((categorie) => {
                    categorie.produits.forEach((produit, index) => {
                        categorie.produits[index] = productsRef.current.find(element => element['@id'] === produit)
                    });
                });

                setCategories(responseCategories);
                doc.style.display = "none";
            } catch (error) {
                console.log('Il ya eu un problème, ou la requete a été interrompue')
            }
        }
        getAllProducts();
        return () => {//en cas de changement de page, annuler la récupération des items
            console.log('composant démonté')
            ourRequest.cancel('component demonté')
        }
    }, [])

    return (
        <div>
            {/* affiche un loader tant que les données ne sont pas récupérées */}
            <div className="load" id="loadAllProducts"></div>
            {categories.map((categorie) => {
                //afficher chaque catégorie
                return (
                    <div className="categorie" key={categorie.nom}>
                        <div className="subsection_title">
                            {categorie.nom}
                        </div>
                        <div className="items">
                            {categorie.produits.map((produit) => {
                                //afficher chaque produit de la catégorie actuelle
                                return (
                                    <Product
                                        key={produit.id}
                                        id={produit.id}
                                        nom={produit.nom}
                                        image={produit.image}
                                    />
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

export default AllProducts;
