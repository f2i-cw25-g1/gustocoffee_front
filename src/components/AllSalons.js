import React, { useState, useEffect } from "react";

import axios from "axios";
import ReactDOM from 'react-dom';

import Salon from "./Salon";

function AllSalons() {

    const [salons, setSalons] = useState([]);
    let responseSalons=[];

    const getSalons = async () => {
        const { data } = await axios.get(`/api/salons`);
        responseSalons = data["hydra:member"];
        setSalons(data["hydra:member"]);
    };

    useEffect(() => {
    getSalons();
    }, []);


    return (
        <div>
            {salons.map((salon) =>{
                return(
                    <Salon
                    key={salon.id}
                    id={salon.id}
                    nom={salon.nom}
                    image={salon.image}
                    />
                );
            })}
        </div>
    );
}

export default AllSalons;
