import React, { useEffect, useRef } from "react";

import "./css/Carousel.css";
import axios from "axios";



const AllProducts = () => {
    const productsRef = useRef([]);
    const categoriesRef = useRef([]);
    const documentRef = useRef(null);

    documentRef.current = document.getElementById("loadAllProducts");


    useEffect(() => {
        const ourRequest = axios.CancelToken.source();

        let doc = document.getElementById("loadAllProducts");


        const getAllProducts = async () => {
            try {
                const [requestProducts, requestCategory] = await Promise.all([
                    axios.get(`/api/produits`, { cancelToken: ourRequest.token }),
                    axios.get(`/api/categories`, { cancelToken: ourRequest.token })
                ]);

                productsRef.current = await requestProducts.data["hydra:member"];
                categoriesRef.current = await requestCategory.data["hydra:member"];


                // for (const [index, categorie] of categoriesRef.current.entries()) {
                //     for (const [index, p] of categorie.produits.entries()) {
                //         categoriesRef.current[index] = p.produits[index] = productsRef.current.find(element => element['@id'] === p);
                //     }
                // }


                // console.log('CATGEROEI REF 1', categoriesRef.current);

                let responseProducts = productsRef.current;
                let responseCategories = categoriesRef.current;

                categoriesRef.current = responseCategories.current.forEach((categorie) => {
                    categorie.produits.forEach((produit, index) => {//pour chaque produit de chaque catégorie, on remplace l'id du produit stocké dans le tableau catégories par l'objet produit lié à cet id
                        categorie.produits[index] = responseProducts.find(element => element.id === produit.split("/api/produits/")[1]);
                    });
                });

                doc.style.display = "none";

                console.log('CATGEROEI REF 2', categoriesRef.current);




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
        <div>
            <div className="load" id="loadAllProducts"></div>
            {categoriesRef.current && categoriesRef.current.map((categorie) => {
                return (
                    <div className="categorie" key={categorie.nom}>
                        <div className="subsection_title">
                            {categorie.nom}
                        </div>
                        {/* <div className="items">
                            {categoriesRef.current.produits.map((produit) => {
                                return (
                                    <Product
                                        key={produit.id}
                                        id={produit.id}
                                        nom={produit.nom}
                                        image={produit.image}
                                    />
                                );
                            })}
                        </div> */}
                    </div>
                );
            })}
        </div>
    );
}

export default AllProducts;
