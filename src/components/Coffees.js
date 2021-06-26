import React, { useState, useEffect } from "react";

import './Coffees.css';
import Coffee from './Coffee';
import axios from "axios";

function Coffees() {
  const [coffees, setProducts] = useState([]);

  const getData = async () => {
    const { data } = await axios.get(`/api/produits/`);
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
