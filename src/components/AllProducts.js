import React, { useEffect, useRef, useState } from "react";
import "./css/Carousel.css";
import axios from "axios";
import Product from "./../components/Product";

const AllProducts = () => {
    const [categories, setCategories] = useState([]);
    const documentRef = useRef(null);
    const productsRef = useRef([]);

    documentRef.current = document.getElementById("loadAllProducts");

    useEffect(() => {
        const ourRequest = axios.CancelToken.source();
        let doc = document.getElementById("loadAllProducts");

        const getAllProducts = async () => {
            try {
                const [requestProducts, requestCategory] = await Promise.all([
                    axios.get(`http://localhost:8000/produits`, { cancelToken: ourRequest.token }),
                    axios.get(`http://localhost:8000/categories`, { cancelToken: ourRequest.token })
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
        return () => {
            console.log('composant démonté')
            ourRequest.cancel('component demonté')
        }
    }, [])

    return (
        <>
            <div>
                <div className="load" id="loadAllProducts"></div>
                {categories.map((categorie) => {
                    return (
                        <div className="categorie" key={categorie.nom}>
                            <div className="subsection_title">
                                {categorie.nom}
                            </div>
                            <div className="items">
                                {categorie.produits.map((produit) => {
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
        </>
    );
}

export default AllProducts;
