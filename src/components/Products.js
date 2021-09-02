import React, { useState, useEffect } from "react";

import "./css/Carousel.css";
import Product from "./Product";
import axios from "axios";
import urlApi from '../urlApi';

//appelé par la page produit, affiche tous les produit de la même catégorie que le produit sélectionné sauf le produit actuel
//exemple : en affichant "croissants", ce composant affihera "d'autres ont aussi consulté Pain au Chocolat, Pain au raisin, ..." (avec lien pour ces produits)
function Products(props) {

  const [products, setProducts] = useState([]);
//récupération des produits de la catégorie, et les ajoute dans la variable correspondante
  const getData = async (categorie) => {
    const { data } = await axios.get(categorie);
    console.log(data["hydra:member"])
    setProducts(data["hydra:member"]);
  };

  useEffect(() => {
    getData(urlApi+"/api/produits?page=1&categorie="+props.categorie.split("/api/categories/")[1])
    .then((response) => {
      for (const val of document.getElementsByClassName("load")) {
        val.style.display = "none";
    }
    });
  }, []);

  return (
    <div className="items">
      <div className="load"></div>
      {products.map((product) => {
        if(props.idProduitActuel != product.id){//ne pas afficher le produit actuel dans le cas où nous sommes sur une page présentant un produit unique
          return (
            <Product
              key={product.id}
              id={product.id}
              nom={product.nom}
              image={product.image}
            />
          );
        }
      })}
    </div>
  );
}

export default Products;
