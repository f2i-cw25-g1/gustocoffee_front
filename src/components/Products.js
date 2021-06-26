import React, { useState, useEffect } from "react";

import "./Products.css";
import Product from "./Product";
import axios from "axios";

function Products() {

  const [products, setProducts] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(`http://localhost:8000/api/produits/`);
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
            description={product.description}
          />
        );
      })}
    </div>
  );
}

export default Products;
