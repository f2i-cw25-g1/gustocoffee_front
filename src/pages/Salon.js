import SingleSalon from '../components/SingleSalon';

import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Salon() {
  const { id } = useParams();
  const [salon, setSalon] = useState();

  useEffect(() => {
    getSalon();
  }, []);

  const getSalon = async () => {
    let { data } = await axios.get(`/api/salons/${id}`);
    setSalon(data);
  };

  if (salon != null) {
    return (
      <main>
      <SingleSalon
        image={salon.image}
        nom={salon.nom}
        description={salon.description}
        capacite={salon.nombrePlace}
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

export default Salon;
