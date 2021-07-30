import SingleProduit from '../components/SingleProduit';
import Products from "../components/Products";

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Produit() {
  const { id } = useParams();
  const [product, setProduct] = useState();

  useEffect(() => {
    getProduct();
  }, []);

  const getProduct = async () => {
    let { data } = await axios.get(`/api/produits/${id}`);
    setProduct(data);
  };

  if (product != null) {
    console.log(product);
    return (
      <main>
      <SingleProduit
        image={product.image}
        nom={product.nom}
        description={product.description}
        prix={product.prix}
      />
      <p className="subsection_title">D'autres ont aussi consulté</p>
      <Products
        categorie = {product.categorie}
      />
    </main>
      );
  } else {
      return (
          <div>

          </div>
      )
  }
}


{/* <div className="produitimage">
<img src={product.image} alt=""></img>
</div>
<div className="produitinfos">
<h1 className="produittitle">{product.nom}</h1>
<p>{product.description}</p>
<p>{product.prix}€</p> */}


export default Produit;
