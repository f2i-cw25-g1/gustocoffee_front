import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as CarteSvg } from '../img/Carte_Gusto_Coffee.svg';
import '../App.css';

const Reservation = () => {
  const date = new Date();
  const today = new Date().toISOString().slice(0, 10);

  const couleurPlaceDisponible = '#D3D36E';
  const couleurPlaceSelectionnee = '#94D36E';
  const couleurPlaceReservee = '#FF6060';

  const carteRef = useRef(null);

  const placesRef = useRef([]);
  const reservationsRef = useRef([]);

  const [places, setPlaces] = useState([]);
  const [reservationsPlaces, setReservationsPlaces] = useState([]);

  const [selectDate, setSelectDate] = useState();
  const [selectHeureDebut, setSelectHeureDebut] = useState();
  const [selectHeureFin, setSelectHeureFin] = useState();

  const [js, setJs] = useState([]);

  let initialFormData = {
    date: '2012-05-05',
    heureDebut: '',
    heureFin: '',
  };

  const [formData, updateFormData] = useState(initialFormData);

  //////////USEFFECT//////////

  // pas claire ............
  useEffect(() => {
    let touteLesPlaces = carteRef.current.getElementsByClassName('place');
    for (var i = 0; i < touteLesPlaces.length; i++) {
      touteLesPlaces[i].setAttribute('fill', couleurPlaceDisponible);
    }
  }, [formData.date]);

  //récupération de toute les places dans le svg, et on y ajoute un event listener dessus
  useEffect(() => {
    const placesInSvg = carteRef.current.getElementsByClassName('place');
    for (let i = 0; i < placesInSvg.length; i++) {
      placesInSvg[i].addEventListener('click', (e) => addPlace(e.target));
    }
  }, []);

  useEffect(() => {
    //execution des requêtes de récupération des données du serveurs
    const recuperation = async () => {
      await recupererPlaces();
      await recupererReservationsPlacesParDate(formData.date);
    };
    recuperation();
  }, []);

  //////////FORM//////////

  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };
  // ... submit to API or something

  //////////FONCTIONS PRINCIPALES//////////

  //ajout d'une place
  const addPlace = async (target) => {
    let placeAjouteeASelection = {
      id: target.id,
      key: `${target.id} ${formData.date} ${formData.heureDebut} ${formData.heureFin}`,
      nom: target.id.split('Place')[1],
      date: formData.date,
      FakeHeureDebut: formData.heureDebut,
      FakeHeureFin: formData.heureFin,
    };

    if (target.getAttribute('fill') === couleurPlaceReservee) {
      alert('place reservée !');
      return;
    }

    if (target.getAttribute('fill') === couleurPlaceDisponible) {
      target.setAttribute('fill', couleurPlaceSelectionnee);
      setJs((prev) => {
        const update = [...prev];
        update.push(placeAjouteeASelection);
        return update;
      });
      return;
    }

    if (target.getAttribute('fill') === couleurPlaceSelectionnee) {
      target.setAttribute('fill', couleurPlaceDisponible);
      setJs((prev) => {
        const update = prev.filter((el) => el.id !== target.id);
        return update;
      });
      return;
    }
  };

  //récupération des places
  const recupererPlaces = async () => {
    const { data } = await axios.get(`/api/place_grande_salles`);
    let placesApi = data['hydra:member'];
    placesRef.current = placesApi;
    setPlaces((prev) => {
      const places = [...placesApi];
      return places;
    });
  };

  //recuperation des reservation pour une date donnée
  //mise a jour de la carte
  const recupererReservationsPlacesParDate = async (date) => {
    const { data } = await axios.get(
      `/api/reservation_places?date_reservation=` + date
    );
    reservationsRef.current = data['hydra:member'];
    miseAJourCartePlaceReservee(reservationsRef.current);
  };

  //récupération des places reservée
  //récupération du nom de la place ( ex: A1)
  //coloration du svg
  const miseAJourCartePlaceReservee = async (placeReservee) => {
    for (const place of placeReservee) {
      let placeNom = placesRef.current.find((e) => e.id === place.id);
      let placeAmodifier = carteRef.current.getElementById(
        'Place' + placeNom.nom
      );
      placeAmodifier.setAttribute('fill', couleurPlaceReservee);
    }
  };

  //////////RETURN//////////

  return (
    <main>
      <div id="formResearch">
        <div className="load" style={{ display: 'none' }}></div>
        <form onSubmit={handleSubmit}>
          <div id="containerDate">
            <label htmlFor="rechercheDate">Date</label>
            <input
              type="date"
              id="rechercheDate"
              name="rechercheDate"
              onChange={handleChange}
              value={formData.date}
            />
          </div>
          <div id="heureDebut">
            <label htmlFor="rechercheHeureDebut">Heure de début</label>
            <input
              type="time"
              id="rechercheHeureDebut"
              name="rechercheHeureDebut"
              onChange={handleChange}
              value={formData.heureDebut}
            />
          </div>
          <div id="heureFin">
            <label htmlFor="rechercheHeureFin">Heure de fin</label>
            <input
              type="time"
              id="rechercheHeureFin"
              name="rechercheHeureFin"
              onChange={handleChange}
              value={formData.heureFin}
            />
          </div>
          <button id="submitDateButton" type="submit">
            Rechercher
          </button>
        </form>
      </div>

      <CarteSvg ref={carteRef} />

      <p>Places selectionnées:</p>
      {js &&
        js.map((a) => {
          return <ul key={a.key}>{a.nom}</ul>;
        })}
    </main>
  );
};

export default Reservation;
