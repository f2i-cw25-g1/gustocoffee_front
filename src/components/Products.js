import React, { useState, useEffect } from "react";

import "./css/Carousel.css";
import Product from "./Product";
import axios from "axios";

function Products(props) {

  const [products, setProducts] = useState([]);

  const getData = async (categorie) => {
    const { data } = await axios.get(categorie);
    console.log(data["hydra:member"])
    setProducts(data["hydra:member"]);
  };

  useEffect(() => {
    if(props.categorie){
      getData("/api/produits?page=1&categorie="+props.categorie.split("/api/categories/")[1]);
    }else{
      getData("/api/produits?page=1&categorie=6");
    }
  }, []);


  return (
    <div className="items">
      {products.map((product) => {
        return (
          <Product
            key={product.id}
            id={product.id}
            nom={product.nom}
            image={product.image}
          />
        );
      })}
    </div>
  );
}

export default Products;
