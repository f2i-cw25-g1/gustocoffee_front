import React, { useState, useEffect } from "react";

import './css/Product.css';

function SingleProduit(props) {
    return (
        <div className="flexproduit">
            <div className="produitimage">
                <img src={props.image} alt=""></img>
            </div>
            <div className="produitinfos">
                <h1 className="produittitle">{props.nom}</h1>
                <p>{props.description}</p>
                <p>{props.prix}€</p>
            </div>
        </div>
      );
 
}

export default SingleProduit;