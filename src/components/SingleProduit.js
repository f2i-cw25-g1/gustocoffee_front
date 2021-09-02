import React from "react";

import './css/Product.css';

//appelé par la page produit, affiche les caractéristiques du produit
function SingleProduit(props) {
    return (
        <div className="flexproduit">
            <div className="produitimage">
                <img src={props.image} alt=""></img>
            </div>
            <div className="produitinfos">
                <h1 className="produittitle">{props.nom}</h1>
                <p>{props.description}</p>
                <p>{parseFloat(props.prix).toFixed(2)}€</p>
            </div>
        </div>
      );
 
}

export default SingleProduit;