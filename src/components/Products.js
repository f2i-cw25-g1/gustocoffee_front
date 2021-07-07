import React, { useState, useEffect } from "react";

import "./css/Carousel.css";
import Product from "./Product";
import axios from "axios";

function Products() {

  const [products, setProducts] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(`/api/produits?page=1&categorie=6`);
    console.log(data["hydra:member"])
    setProducts(data["hydra:member"]);
  };

  useEffect(() => {
    getData();
    console.log(products);
  }, []);


  return (
    <div className="items">
      {products.map((product) => {
        return (
          <Product
            key={product.id}
            nom={product.nom}
            image={product.image}
          />
        );
      })}
    </div>
  );
}

export default Products;
