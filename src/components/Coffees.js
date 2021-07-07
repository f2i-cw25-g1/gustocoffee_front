import React, { useState, useEffect } from "react";

import './css/Carousel.css';
import Coffee from './Coffee';
import axios from "axios";

function Coffees() {
  const [coffees, setProducts] = useState([]);


/*
  //test equivalent old get data que pour les cafés
  const getData = async () => {
    await axios.get(`/api/categories/1`)
    .then((response) => {
      console.log(response.data.produits);
      let tableauCafes= [];
      response.data.produits.forEach((item)=>{
        axios.get(item).then((response) => {
          tableauCafes.push(response.data);  
        }, (error) => {});
      });
      console.log(tableauCafes);
      setProducts(tableauCafes);
    }, (error) => {});
  };
*/

  
  //old get data
  const getData = async () => {
    const { data } = await axios.get(`/api/produits?page=1&categorie=1`);
    setProducts(data["hydra:member"]);
  };

  useEffect(() => {
    getData();
    console.log(coffees);
  }, []);


  return (
    <div className="items">
      {coffees.map((product) => {
        return (
          <Coffee
            key={product.id}
            nom={product.nom}
            image={product.image}
          />
        );
      })}
    </div>
  );
}

export default Coffees;
