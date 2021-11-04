import SingleProduit from '../components/SingleProduit';
import Products from '../components/Products';

import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import urlApi from '../urlApi';

//page affichant un produit unique
function Produit() {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [result, setResult] = useState();

  useEffect(() => {
    getProduct();
  }, [id]);

  const resultat = useRef({});
  function calcul(event){
    console.log(event.target.value);
    setResult((event.target.value*product.prix).toFixed(2));
  }

  

  //récupère le produit sélectionné
  const getProduct = async () => {
    await axios.get(urlApi+`/api/produits/${id}`).then((response) => {
      let { data } = response;
      setProduct(data);
      document.getElementById('loadProduit').style.display = 'none';
    });
  };

  return (
    <main>
      <div className="load" id="loadProduit"></div>
      {(() => {
        if (product != null) {
          console.log(product);
          return (
            <div>



              <div className="cadrePanier">
                <div style={{marginBottom: '20px',textAlign:'center'}} >
                  {product.nom}
                </div>
                <div>
                  Quantité <input onChange={calcul} type="number" autoComplete="off" name="nombreArticle" min="0" max="999"></input>
                </div>
                <div>{result || 0} € TTC
                </div>
                <button id="submitDateButton">Ajouter au panier</button>
              </div>


              {/* composant affichant les caractéristiques du produit */}
              <SingleProduit
                image={product.image}
                nom={product.nom}
                description={product.description}
                prix={product.prix}
              />
              <p className="subsection_title">D'autres ont aussi consulté</p>
              {/* composant affichant les produits de cette catégorie */}
              <Products categorie={product.categorie} idProduitActuel={id} />
            </div>
          );
        } else {
          return <div></div>;
        }
      })()}
    </main>
  );
}

export default Produit;
