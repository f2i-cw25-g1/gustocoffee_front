import React from "react";
import { Link } from "react-router-dom";

//Composant appelé par la page Salon, affiche les caractéristiques d'un salon
function SingleProduit(props) {
    return (
        <div>
        <p className="subsection_title">{props.nom}</p>
            <div className="saloncontainer">
                <img src={props.image} alt=""></img>
                <p>Description : {props.description}</p>
                <p>Capacité : {props.capacite} personnes</p>
                <div className="center">
                    <Link className="buttonreserver" to='/reservation'>Réserver</Link>
                </div>
            </div>
        </div>
      );
 
}

export default SingleProduit;