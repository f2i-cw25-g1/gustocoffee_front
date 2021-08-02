import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { ReactComponent as CarteSvg } from '../img/Carte_Gusto_Coffee.svg';
import '../App.css';

function Reservation() {
  const date = new Date();
  const today = new Date().toISOString().slice(0, 10);
  let dateUtilisee = '2021-07-06'; //today;
  let heureDebutUtilisee = date.getHours() + ':00';
  let heureFinUtilisee = date.getHours() + 1 + ':00';

  const couleurPlaceDisponible = '#D3D36E';
  const couleurPlaceSelectionnee = '#94D36E';
  const couleurPlaceReservee = '#FF6060';

  const [places, setPlaces] = useState([]);
  const [salons, setSalons] = useState([]);
  const [reservationsPlace, setReservationsPlaces] = useState([]);
  const [reservationsSalons, setReservationsSalons] = useState([]);
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  let responsePlaces;
  let responseSalons;
  let responseReservationsPlace;
  let responseReservationsSalons;
  let jsSelectedPlaces = [];

  useEffect(() => {
    //au chargement de la page

    //récupération de date en "dur"
    //pour qu'il y ai une date qui s'affiche sinon ça serait vide
    document.getElementById('rechercheHeureDebut').value = heureDebutUtilisee;
    document.getElementById('rechercheHeureFin').value = heureFinUtilisee;
    document.getElementById('rechercheDate').value = dateUtilisee;

    //quand je veux selectionner une nouvelle date
    document
      .getElementById('submitDateButton')
      .addEventListener('click', function (event) {
        event.preventDefault();

        heureDebutUtilisee = document.getElementById(
          'rechercheHeureDebut'
        ).value;
        heureFinUtilisee = document.getElementById('rechercheHeureFin').value;

        //récupération de la journée entiere
        //si la valeur du jour est différente on fait quelque chose sinon on ne fait rien
        if (document.getElementById('rechercheDate').value != dateUtilisee) {
          //on récupère toute les places
          //on remet toute les places en vert
          //réinitialisation des couleurs des places
          let touteLesPlaces = document.getElementsByClassName('place');
          for (var i = 0; i < touteLesPlaces.length; i++) {
            touteLesPlaces[i].setAttribute('fill', couleurPlaceDisponible);
          }
          dateUtilisee = document.getElementById('rechercheDate').value;

          //requette qui récupère les reservations de la date selectioné
          recupererReservationsParDate();
        }
      });
    //récupération du nom de chaque place
    //place : id et nom
    recupererPlaces();

    //meme principe que les places
    recupererSalons(); //.then((response) => {console.log('loaded')}, (error) => {});

    //reservation place : id de la place
    recupererReservationsParDate();

    //récupération de toute les places dans le svg, et on y ajoute un event listener dessus
    let placesInSvg = document.getElementsByClassName('place');
    for (let i = 0; i < placesInSvg.length; i++) {
      placesInSvg[i].addEventListener('click', (event) => {
        addPlaceInSelectedPlaces(event.target);
      });
    }
  }, []);

  // useEffect(() => {
  //   console.log('test')
  // },[selectedPlaces]);

  // ajout de la place cliquée
  const addPlaceInSelectedPlaces = (target) => {
    //si la place est reservée
    if (target.getAttribute('fill') == couleurPlaceReservee) {
      console.log('place déja réservée');
    } else {
      //on va pouvoir la selectionner
      let test = jsSelectedPlaces.filter(function (currentElement) {
        //debut de test gestion d'heure (heure debut) ( true ou false)
        return (
          currentElement.id == target.id &&
          currentElement.date == dateUtilisee &&
          currentElement.heureDebutUtilisee ==
            currentElement.heureDebutUtilisee &&
          currentElement.heureFinUtilisee == heureFinUtilisee
        );
      });
      //si j'ai récuéprer un element déja selectionner ( si y a quelque chose dans le tableau)
      if (test.length) {
        console.log('place deja selectionee');
        //on remettre la place selectionnée en place disponible
        //si il clique sur une place selectionnée elle repasse en disponible
        let index = jsSelectedPlaces.indexOf(test[0]);
        if (index !== -1) {
          jsSelectedPlaces.splice(index, 1);
        }
        document
          .getElementById(target.id)
          .setAttribute('fill', couleurPlaceDisponible);
      } else {
        console.log('place ajoutee');

        let placeAjouteeASelection = {
          id: target.id,
          key:
            target.id +
            ' ' +
            dateUtilisee +
            ' ' +
            heureDebutUtilisee +
            ' ' +
            heureFinUtilisee,
          nom: target.id.split('Place')[1],
          date: dateUtilisee,
          heureDebutUtilisee: heureDebutUtilisee,
          heureFinUtilisee: heureFinUtilisee,
        };

        document
          .getElementById(target.id)
          .setAttribute('fill', couleurPlaceSelectionnee);
        jsSelectedPlaces.push(placeAjouteeASelection);
        setSelectedPlaces(jsSelectedPlaces);
      }
      console.log(jsSelectedPlaces);
    }
  };

  //mise a jour de la carte
  const recupererReservationsParDate = async (event) => {
    //pour toute les places selectionner on remet en "verte" claire
    jsSelectedPlaces.forEach(miseAJourCartePlaceSelectionnee);

    //on récupère les reservations des places en fonction de la date
    recupererReservationsPlacesParDate(dateUtilisee).then(
      (response) => {
        //on met a jour ( en rouge ) les places reservées en fonction des reservations
        miseAJourCartePlacesReservees();

        //pas encore fait
        // miseAJourCarteSalonsReserves()
      },
      (error) => {}
    );

    recupererReservationsSalonsParDate(dateUtilisee);
  };

  const recupererPlaces = async (event) => {
    const { data } = await axios.get(`/api/place_grande_salles`);
    setPlaces(data['hydra:member']);
    responsePlaces = data['hydra:member'];
  };

  const recupererSalons = async (event) => {
    const { data } = await axios.get(`/api/salons`);
    setSalons(data['hydra:member']);
    responseSalons = data['hydra:member'];
  };

  //récupération reservation des places en fonction de la date selectionnée
  const recupererReservationsPlacesParDate = async (date, event) => {
    const { data } = await axios.get(
      `/api/reservation_places?date_reservation=` + date
    );
    setReservationsPlaces(data['hydra:member']);
    responseReservationsPlace = data['hydra:member'];
  };

  //idem que fonction en haut
  const recupererReservationsSalonsParDate = async (date, event) => {
    const { data } = await axios.get(
      `/api/reservation_salons?date_reservation=` + date
    );
    setReservationsSalons(data['hydra:member']);
    responseReservationsSalons = data['hydra:member'];
  };

  //après qu'on ai récupéré toute les reservation en met en rouge les places reservées
  // " fonction qui met a jour TOUTE les places reservées "
  const miseAJourCartePlacesReservees = () => {
    //au cas utile que dans certain cas
    //s'assure qu'on a bien récupéré les places avant de mettre a jour les places

    //si place non récupéré ?
    if (!responsePlaces) {
      recupererReservationsParDate();
    } else {
      //si place récupérée : pour chaque reservation de place on mets à jour la place en question
      responseReservationsPlace.forEach(miseAJourCartePlaceReservee);
    }
  };

  //on met a jour pour une place spécifique pour dire quel est reservé
  // " fonction qui met a jour 1 place reservée"
  const miseAJourCartePlaceReservee = (placeReservee) => {
    placeReservee.nom = responsePlaces.find(
      (element) =>
        element.id ==
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
    //si on est sur la bonne date
    if (placeSelectionnee.date == dateUtilisee) {
      //on met a jour place pour quel sois en vert claire et quel sois en place selectionnée
      document
        .getElementById(placeSelectionnee.id)
        .setAttribute('fill', couleurPlaceSelectionnee);
    }
  };

  // const miseAJourCarteSalonsReserves=() => {

  // }

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

      {/* <p>{JSON.stringify(selectedPlaces)}</p> */}
      {selectedPlaces.map((a) => {
        return <div key={a.key}>{a.nom}</div>;
      })}
    </main>
  );
}

export default Reservation;
