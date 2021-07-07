import React, { useState, useEffect } from "react";

import "./css/Carousel.css";
import axios from "axios";
import ReactDOM from 'react-dom';

import Product from "./Product";

function AllProducts() {
/*
    const [products, setProducts] = useState([]);//products = résultat du axios get, set products peut être modifié, ne change rien, usestate appelle use effect

    let allProducts = [];
    let categories = [];

    const getData = async () => {
        await axios.get(`/api/produits`)//récupération des produits
        .then((response) => {
            allProducts = response.data["hydra:member"];
            axios.get(`/api/categories`)//récupération des catégories après la récupération des produits
            .then((response) => {
                categories = response.data["hydra:member"] ;
                categories.forEach((categorie)=>{
                    categorie.produits.forEach((produit, index)=>{//pour chaque produit de chaque catégorie, on remplace l'id du produit stocké dans le tableau catégories par l'objet produit lié à cet id
                        categorie.produits[index] = allProducts.find(element => element.id == produit.split("/api/produits/")[1]);
                    });
                });
                console.log(categories);
            }, (error) => {});
        }, (error) => {});
    };
*/

    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    let responseProducts=[];
    let responseCategories=[];

    const getProducts = async () => {
        const { data } = await axios.get(`/api/produits`);
        responseProducts = data["hydra:member"];
        setProducts(data["hydra:member"]);
        getCategories(responseProducts);
    };

    const getCategories = async (responseProducts) => {
        const { data } = await axios.get(`/api/categories`);
        responseCategories = data["hydra:member"];
        console.log(data["hydra:member"]);
       
        responseCategories.forEach((categorie)=>{
            categorie.produits.forEach((produit, index)=>{//pour chaque produit de chaque catégorie, on remplace l'id du produit stocké dans le tableau catégories par l'objet produit lié à cet id
                categorie.produits[index] = responseProducts.find(element => element.id == produit.split("/api/produits/")[1]);
            });
        });
        
        setCategories(responseCategories);
    };

    useEffect(() => {
    getProducts();
    }, []);


    return (
        <div>
            {categories.map((categorie) =>{
                return(
                    <div className="categorie">
                        <div className="subsection_title">
                        {categorie.nom}
                        </div>
                        <div className="items">
                        {categorie.produits.map((produit) =>{
                            return(
                                <Product
                                key={produit.id}
                                nom={produit.nom}
                                image={produit.image}
                                />
                            );
                        })}
                        </div>
                    </div>
                );
            })}

            {console.log("categories",categories)}
        </div>
    );
}

export default AllProducts;
