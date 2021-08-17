import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as CarteSvg } from '../img/Carte_Gusto_Coffee.svg';
import '../App.css';
import useStateWithPromise from '../components/customHook/useStateWithPromise';

const Reservation = () => {
  const date = new Date();
  const today = new Date().toISOString().slice(0, 10);

  let FakeDate = '2021-07-06'; //today;
  let FakeHeureDebut = date.getHours() + ':00';
  let FakeHeureFin = date.getHours() + 1 + ':00';

  const couleurPlaceDisponible = '#D3D36E';
  const couleurPlaceSelectionnee = '#94D36E';
  const couleurPlaceReservee = '#FF6060';

  const placesRef = useRef([]);
  const reservationsRef = useRef([]);

  const [places, setPlaces] = useState([]);
  const [reservationsPlaces, setReservationsPlaces] = useState([]);

  let j = [];
  const [js, setJs] = useState([]);

  useEffect(() => {
    //récupération de date en "dur"
    document.getElementById('rechercheHeureDebut').value = FakeHeureDebut;
    document.getElementById('rechercheHeureFin').value = FakeHeureFin;
    document.getElementById('rechercheDate').value = FakeDate;

    //quand je veux selectionner une nouvelle date
    document
      .getElementById('submitDateButton')
      .addEventListener('click', (event) => {
        event.preventDefault();

        FakeHeureDebut = document.getElementById('rechercheHeureDebut').value;
        FakeHeureFin = document.getElementById('rechercheHeureFin').value;

        //récupération de la journée entiere
        //si la valeur du jour est différente on fait quelque chose sinon on ne fait rien
        if (document.getElementById('rechercheDate').value !== FakeDate) {
          //on récupère toute les places
          //on remet toute les places en vert
          //réinitialisation des couleurs des places

          let touteLesPlaces = document.getElementsByClassName('place');
          for (var i = 0; i < touteLesPlaces.length; i++) {
            touteLesPlaces[i].setAttribute('fill', couleurPlaceDisponible);
          }
          FakeDate = document.getElementById('rechercheDate').value;

          //requette qui récupère les reservations de la date selectioné
          // recupererReservationsParDate();
        }
      });
  }, []);

  //récupération de toute les places dans le svg, et on y ajoute un event listener dessus
  useEffect(() => {
    const placesInSvg = document.getElementsByClassName('place');
    for (let i = 0; i < placesInSvg.length; i++) {
      placesInSvg[i].addEventListener('click', (event) => {
        addPlace(event.target);
      });
    }
  }, []);

  //execution des requêtes de récupération des données du serveurs
  useEffect(() => {
    const recuperation = async () => {
      await recupererPlaces();
      await recupererReservationsPlacesParDate();
    };
    recuperation();
  }, []);

  //ajout d'une place
  const addPlace = async (target) => {
    let placeAjouteeASelection = {
      id: target.id,
      key: `${target.id} ${FakeDate} ${FakeHeureDebut} ${FakeHeureFin}`,
      nom: target.id.split('Place')[1],
      date: FakeDate,
      FakeHeureDebut: FakeHeureDebut,
      FakeHeureFin: FakeHeureFin,
    };

    if (target.getAttribute('fill') === couleurPlaceReservee) {
      alert('place reservée !');
      return;
    }

    if (target.getAttribute('fill') === couleurPlaceDisponible) {
      j.push(placeAjouteeASelection);
      target.setAttribute('fill', couleurPlaceSelectionnee);
      setJs([...j]);
      return;
    }

    if (target.getAttribute('fill') === couleurPlaceSelectionnee) {
      j = j.filter((el) => el.id !== target.id);
      target.setAttribute('fill', couleurPlaceDisponible);
      setJs([...j]);
      return;
    }
  };

  //récupération des places
  const recupererPlaces = async () => {
    const { data } = await axios.get(`/api/place_grande_salles`);
    let placesApi = data['hydra:member'];
    placesRef.current = placesApi;
    setPlaces([...placesApi]);
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
      let placeAmodifier = document.getElementById('Place' + placeNom.nom);
      placeAmodifier.setAttribute('fill', couleurPlaceReservee);
    }
  };

  return (
    <main>
      <div id="formResearch">
        <div className="load" style={{ display: 'none' }}></div>
        <form onSubmit={recupererReservationsParDate}>
          <div id="containerDate">
            <label htmlFor="rechercheDate">Date</label>
            <input type="date" id="rechercheDate" name="rechercheDate" />
          </div>
          <div id="heureDebut">
            <label htmlFor="rechercheHeureDebut">Heure de début</label>
            <input
              type="time"
              id="rechercheHeureDebut"
              name="rechercheHeureDebut"
            />
          </div>
          <div id="heureFin">
            <label htmlFor="rechercheHeureFin">Heure de fin</label>
            <input
              type="time"
              id="rechercheHeureFin"
              name="rechercheHeureFin"
            />
          </div>
          <button id="submitDateButton" type="submit">
            Rechercher
          </button>
        </form>
      </div>

      <CarteSvg />

      <p>Places selectionnées:</p>
      {js &&
        js.map((a) => {
          return <ul key={a.key}>{a.nom}</ul>;
        })}
    </main>
  );
};

export default Reservation;
