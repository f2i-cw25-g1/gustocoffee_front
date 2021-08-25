import axios from 'axios';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ReactComponent as CarteSvg } from '../img/Carte_Gusto_Coffee.svg';
import '../App.css';
import '../components/css/Reservation.css'

// 06 07 2021 08:00 18:00
// 15 08 2021 10:00 12:30

import moment from 'moment';


const Reservation = () => {
  const couleurPlaceDisponible = '#D3D36E';
  const couleurPlaceSelectionnee = '#94D36E';
  const couleurPlaceReservee = '#FF6060';

  const carteRef = useRef(null);
  const firstUpdate = useRef(true);
  const formDataRef = useRef({});

  const [formData, setFormData] = useState({})
  const [places, setPlaces] = useState([]);
  const [reservationsPlaces, setReservationsPlaces] = useState([]);
  const [placesSelectionnees, setPlacesSelectionnees] = useState([]);

  useLayoutEffect(() => {
    let date = moment().local('fr').format('DD/MM/YYYY');
    let heureDebut = moment().local('fr').format('HH:mm');
    let heureFin = moment().local('fr').add(1, 'hour').format('HH:mm');

    if (heureDebut >= '21:00') {
      date = moment().add(1, 'days').format('DD/MM/YYYY');
      heureDebut = moment({ hour: 7, minute: 0 }).local('fr').format('HH:mm');
      heureFin = moment({ hour: 8, minute: 0 }).local('fr').format('HH:mm');
    }
    let initialState = {
      date: date,
      heureDebut: heureDebut,
      heureFin: heureFin
    }
    setFormData({
      date: initialState.date,
      heureDebut: initialState.heureDebut,
      heureFin: initialState.heureFin
    })
    let formatedDate = moment(initialState.date, 'DD/MM/YYYY').format('YYYY-MM-DD');

    formDataRef.current['rechercheDate'].value = formatedDate;
    formDataRef.current['rechercheHeureDebut'].value = initialState['heureDebut'];
    formDataRef.current['rechercheHeureFin'].value = initialState['heureFin'];
  }, [])

  useEffect(() => {
    let touteLesPlaces = carteRef.current.getElementsByClassName('place');
    for (var i = 0; i < touteLesPlaces.length; i++) {
      touteLesPlaces[i].setAttribute('fill', couleurPlaceDisponible);
    }
  }, [formData]);


  useEffect(() => {
    const placesInSvg = carteRef.current.getElementsByClassName('place');
    for (let i = 0; i < placesInSvg.length; i++) {
      placesInSvg[i].addEventListener('click', (e) => addPlace(e.target));
    }
  }, []);


  useEffect(() => {
    const ourRequest = axios.CancelToken.source()

    const fetchReservation = async (date) => {
      try {
        const [request1, request2] = await Promise.all([
          axios.get(`/api/place_grande_salles`, { cancelToken: ourRequest.token }),
          axios.get(`/api/reservation_places?date_reservation=${date}`, { cancelToken: ourRequest.token })
        ]);

        await setPlaces(await request1.data['hydra:member']);
        await setReservationsPlaces(await request2.data['hydra:member']);

      } catch (error) {
        console.log('Il ya eu un problème, ou la requete a été interrompue')
      }
    }
    fetchReservation(formData.date);
    return () => {
      console.log('requête terminée')
      ourRequest.cancel('component demonté')
    }
  }, [formData])


  const handleRerchercherDate = (e) => {
    e.preventDefault();
    setFormData(prev => {
      const setArray = {
        date: e.target['rechercheDate'].value,
        heureDebut: e.target['rechercheHeureDebut'].value,
        heureFin: e.target['rechercheHeureFin'].value
      }
      console.log(('arraySet', setArray));
      return setArray;
    })
  };

  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    console.log('PLACE RESERVER:', reservationsPlaces)
    miseAJourCartePlacesReservees(reservationsPlaces);
  }, [reservationsPlaces]);

  //ajout d'une place
  const addPlace = async (target) => {
    let placeAjouteeASelection = {
      id: target.id,
      key: `${target.id} ${formDataRef.current['rechercheDate']} ${formData['heureDebut']} ${formDataRef.current['rechercheHeureFin']}`,
      nom: target.id.split('Place')[1],
      date: formDataRef.current['rechercheDate'],
      heureDebut: formData['heureDebut'],
      heureFin: formDataRef.current['rechercheHeureFin'],
    };

    if (target.getAttribute('fill') === couleurPlaceReservee) {
      alert('place reservée !');
      return;
    }

    if (target.getAttribute('fill') === couleurPlaceDisponible) {
      target.setAttribute('fill', couleurPlaceSelectionnee);
      setPlacesSelectionnees((prev) => {
        const update = [...prev];
        update.push(placeAjouteeASelection);
        return update;
      });
      return;
    }

    if (target.getAttribute('fill') === couleurPlaceSelectionnee) {
      target.setAttribute('fill', couleurPlaceDisponible);
      setPlacesSelectionnees((prev) => {
        const update = prev.filter((el) => el.id !== target.id);
        return update;
      });
      return;
    }
  };

  //récupération des places reservée
  //coloration du svg
  const miseAJourCartePlacesReservees = (placesReservees) => {
    for (const placeReservee of placesReservees) {
      let heureDebutPlaceReservee = placeReservee.heureDebut.substr(11, 5);
      let heureFinPlaceReservee = placeReservee.heureFin.substr(11, 5);


      if ( //si on est dans l'un des cas suivants, la reservation actuelle est bien occupee sur la plage horaire selectionnee, donc colorier
        (heureDebutPlaceReservee <= formData['heureDebut'] && heureFinPlaceReservee >= formData['heureDebut']) ||
        (heureDebutPlaceReservee <= formData['heureFin'] && heureFinPlaceReservee >= formData['heureFin']) ||
        (heureDebutPlaceReservee >= formData['heureDebut'] && heureFinPlaceReservee <= formData['heureFin'])
      ) {
        let placeNom = places.find((e) => e.id === placeReservee.id);
        let placeAmodifier = carteRef.current.getElementById(
          'Place' + placeNom.nom
        );
        placeAmodifier.setAttribute('fill', couleurPlaceReservee);
      }
    }
  };

  return (
    <main>
      <p className="subsection_title">Réservation</p>

      <div className="flexform">
        <div id="formResearch">
          <div className="load" style={{ display: 'none' }}></div>
          <form onSubmit={handleRerchercherDate} ref={formDataRef}>
            <div id="containerDate">
              <label htmlFor="rechercheDate">Date</label>
              <input type="date"
                id="rechercheDate"
                name="rechercheDate"
              />
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
          <p className="resume_places_selectionnees">Résumé places selectionnées :</p>
          <div className="places_selectionnees">
            {placesSelectionnees &&
              placesSelectionnees.map((a) => {
                return <ul key={a.key}>{a.nom}</ul>;
              })}
          </div>
        </div>
        <div className="table_overflow">
          <CarteSvg className="carte_svg" ref={carteRef} />
        </div>
      </div>
      <div className="legende_couleur_place">
        <p className="couleur_places_disponibles">place(s) disponible(s)</p>
        <p className="couleur_places_selectionnees">place(s) selectionnée(s)</p>
        <p className="couleur_places_occupees">place(s) occupée(s)</p>
      </div>
    </main>
  );
};

export default Reservation;
