import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { ReactComponent as CarteSvg } from '../img/Carte_Gusto_Coffee.svg';
import '../App.css';

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
    setPlaces(placesRef.current);
    setReservationsPlaces(reservationsRef.current);
  }, [places, reservationsPlaces]);

  useEffect(() => {
    //récupération de date en "dur"
    document.getElementById('rechercheHeureDebut').value = FakeHeureDebut;
    document.getElementById('rechercheHeureFin').value = FakeHeureFin;
    document.getElementById('rechercheDate').value = FakeDate;

    //quand je veux selectionner une nouvelle date
    document
      .getElementById('submitDateButton')
      .addEventListener('click', function (event) {
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
          recupererReservationsParDate();
        }
      });

    recupererPlaces();
    recupererReservationsParDate();
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

  //mise a jour de la carte'
  const recupererReservationsParDate = async () => {
    //pour toute les places selectionner on remet en "verte" claire
    places.forEach(miseAJourCartePlaceSelectionnee);

    //on récupère les reservations des places en fonction de la date
    recupererReservationsPlacesParDate(FakeDate);

    //recupererReservationsSalonsParDate(FakeDate);
  };

  const recupererPlaces = async () => {
    const { data } = await axios.get(`/api/place_grande_salles`);
    placesRef.current = await data['hydra:member'];
  };

  const recupererReservationsPlacesParDate = async (date) => {
    const { data } = await axios.get(
      `/api/reservation_places?date_reservation=` + date
    );
    reservationsRef.current = await data['hydra:member'];
  };

  // const recupererSalons = async () => {
  //   const { data } = await axios.get(`/api/salons`);
  //   setSalons(...data['hydra:member']);
  // };

  // const recupererReservationsSalonsParDate = async (date) => {
  //   const { data } = await axios.get(
  //     `/api/reservation_salons?date_reservation=` + date
  //   );
  //   setReservationsSalons(...data['hydra:member']);
  // };

  //après qu'on ai récupéré toute les reservation en met en rouge les places reservées
  // " fonction qui met a jour TOUTE les places reservées "
  const miseAJourCartePlacesReservees = () => {
    //au cas utile que dans certain cas
    //s'assure qu'on a bien récupéré les places avant de mettre a jour les places

    //si place non récupéré ?
    if (!places) {
      recupererReservationsParDate();
    } else {
      //si place récupérée : pour chaque reservation de place on mets à jour la place en question
      reservationsPlaces.forEach(miseAJourCartePlaceReservee);
    }
  };

  //on met a jour pour une place spécifique pour dire quel est reservé
  // " fonction qui met a jour 1 place reservée"
  const miseAJourCartePlaceReservee = (placeReservee) => {
    placeReservee.nom = places.find(
      (element) =>
        element.id ===
        placeReservee.placeGrandeSalle.split('/api/place_grande_salles/')[1]
    ).nom;
    //si on trouve l'id de la place reservée, et on change la couleur en place reservée
    if (document.getElementById('Place' + placeReservee.nom)) {
      document
        .getElementById('Place' + placeReservee.nom)
        .setAttribute('fill', couleurPlaceReservee);
    }
  };

  // cette fonction met a un jour 1 place selectionnée
  // elle est appelée pour chaque place selectionnée
  const miseAJourCartePlaceSelectionnee = (placeSelectionnee) => {
    console.log('T');
    //si on est sur la bonne date
    if (placeSelectionnee.date === FakeDate) {
      //on met a jour place pour quel sois en vert claire et quel sois en place selectionnée
      document
        .getElementById(placeSelectionnee.id)
        .setAttribute('fill', couleurPlaceSelectionnee);
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
      {js &&
        js.map((a) => {
          return <li key={a.key}>{a.nom}</li>;
        })}
    </main>
  );
};

export default Reservation;
