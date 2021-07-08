import React, { useState, useEffect } from "react";

import './css/Product.css';

import { useParams } from "react-router-dom";
import axios from "axios";

function SingleProduit() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    const { data } = await axios.get(`/api/produits/${id}`);
    setProduct(data);
    console.log(data.image);
  };

  if (product != null) {
    console.log(product);
    return (
        <div className="flexproduit">
            <div className="produitimage">
                <img src={product.image} alt=""></img>
            </div>
            <div className="produitinfos">
                <h1 className="produittitle">{product.nom}</h1>
                <p>{product.description}</p>
                <p>{product.prix}€</p>
            </div>
        </div>
      );
  } else {
      return (
          <div>

          </div>
      )
  }
}

export default SingleProduit;