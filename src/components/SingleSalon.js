import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function SingleProduit(props) {
    return (
        <div>
            <img src={props.image} alt=""></img>
            <p>{props.nom}</p>
            <p>{props.description}</p>
            <p>{props.capacite} personnes</p>
            <Link className="sub_button" to='/reservation'>Réserver</Link>
        </div>
      );
 
}

export default SingleProduit;