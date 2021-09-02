import axios from 'axios';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ReactComponent as CarteSvg } from '../img/Carte_Gusto_Coffee.svg';
import { ReactComponent as CarteSalonsSvg } from '../img/Carte_Salons_Gusto_Coffee.svg';
import '../App.css';
import '../components/css/Reservation.css';
import {Link} from 'react-router-dom';
import moment from 'moment';
import urlApi from '../urlApi';

// 06 07 2021 08:00 18:00
// 15 08 2021 10:00 12:30

const Reservation = () => {
  const couleurPlaceDisponible = '#D3D36E';
  const couleurPlaceSelectionnee = '#94D36E';
  const couleurPlaceReservee = '#FF6060';

  const firstUpdate = useRef(true);

  //date heure
  const formDataRef = useRef({});
  const [formData, setFormData] = useState({})
  
  //places
  const carteRef = useRef(null);
  const [places, setPlaces] = useState([]);
  const [reservationsPlaces, setReservationsPlaces] = useState([]);
  const [placesSelectionnees, setPlacesSelectionnees] = useState([]);

  //salons
  const carteSalonsRef = useRef(null);
  const [salons, setSalons] = useState([]);
  const [reservationsSalons, setReservationsSalons] = useState([]);
  const [salonsSelectionnes, setSalonsSelectionnes] = useState([]);

  //executer du code synchrone, il va attendre qu'on ai récupéré les données
  useLayoutEffect(() => {
    //let date = moment().local('fr').format('DD/MM/YYYY');
    //let heureDebut = moment().local('fr').format('HH:mm');
    //let heureFin = moment().local('fr').add(1, 'hour').format('HH:mm');
    
    //exemple pour aller aller sur la prochaine quinzaine de minutes
    //const start = moment('2018-12-08 09:42');
    //const remainder = 30 - (start.minute() % 30);
    //const dateTime = moment(start).add(remainder, "minutes").format("DD.MM.YYYY, h:mm:ss a");
    //console.log(dateTime);
        
    
    let start = moment().format('mm');
    const remainder = 15 - (start % 15);

    let date = moment().local('fr').add(remainder, "minutes").format('DD/MM/YYYY');
    let heureDebut = moment().local('fr').add(remainder, "minutes").format('HH:mm');
    let heureFin = moment().local('fr').add(remainder, "minutes");
    heureFin = heureFin.add(1, 'hour').format('HH:mm');

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
    let toutesLesPlaces = carteRef.current.getElementsByClassName('place');
    for (var i = 0; i < toutesLesPlaces.length; i++) {
      toutesLesPlaces[i].setAttribute('fill', couleurPlaceDisponible);
    }
    placesSelectionnees.forEach((placeSelectionnee ) => {
      if(placeSelectionnee.date === formDataRef.current['rechercheDate'].value){
        if(
          (placeSelectionnee.heureDebut <= formData['heureDebut'] && placeSelectionnee.heureFin >= formData['heureDebut']) ||
          (placeSelectionnee.heureDebut <= formData['heureFin'] && placeSelectionnee.heureFin >= formData['heureFin']) ||
          (placeSelectionnee.heureDebut >= formData['heureDebut'] && placeSelectionnee.heureFin <= formData['heureFin'])
        ){
          let placeAmodifier = carteRef.current.getElementById(placeSelectionnee.id);
          placeAmodifier.setAttribute('fill', couleurPlaceSelectionnee);
        }
      }
    });

    let tousLesSalons = carteSalonsRef.current.getElementsByClassName('salon');
    for (let a = 0; a < tousLesSalons.length; a++) {
      tousLesSalons[a].setAttribute('fill', couleurPlaceDisponible);
    }
    salonsSelectionnes.forEach((salonSelectionne ) => {
      if(salonSelectionne.date === formDataRef.current['rechercheDate'].value){
        if(
          (salonSelectionne.heureDebut <= formData['heureDebut'] && salonSelectionne.heureFin >= formData['heureDebut']) ||
          (salonSelectionne.heureDebut <= formData['heureFin'] && salonSelectionne.heureFin >= formData['heureFin']) ||
          (salonSelectionne.heureDebut >= formData['heureDebut'] && salonSelectionne.heureFin <= formData['heureFin'])
        ){
          let salonAmodifier = carteSalonsRef.current.getElementById(salonSelectionne.id);
          salonAmodifier.setAttribute('fill', couleurPlaceSelectionnee);
        }
      }
    });
  }, [formData]);

  //places ajout listener
  useEffect(() => {
    const placesInSvg = carteRef.current.getElementsByClassName('place');
    for (let i = 0; i < placesInSvg.length; i++) {
      placesInSvg[i].addEventListener('click', (e) => addPlace(e.target));
    }
    const salonsInSvg = carteSalonsRef.current.getElementsByClassName('salon');
    for (let i = 0; i < salonsInSvg.length; i++) {
      salonsInSvg[i].addEventListener('click', (e) => addSalon(e.target));
    }
  }, []);

  //récupération des données
  useEffect(() => {
    const ourRequest = axios.CancelToken.source();

    const fetchReservation = async (date) => {
      try {
        const [request1, request2, request3, request4] = await Promise.all([
          axios.get(urlApi+`/api/place_grande_salles`, { cancelToken: ourRequest.token }),
          axios.get(urlApi+`/api/reservation_places?date_reservation=${date}`, { cancelToken: ourRequest.token }),
          axios.get(urlApi+`/api/salons`, { cancelToken: ourRequest.token }),
          axios.get(urlApi+`/api/reservation_salons?date_reservation=${date}`, { cancelToken: ourRequest.token })
        ]);

        await setPlaces(await request1.data['hydra:member']);
        await setReservationsPlaces(await request2.data['hydra:member']);
        await setSalons(await request3.data['hydra:member']);
        await setReservationsSalons(await request4.data['hydra:member']);

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

  //places et salons réservées mise à jour carte 
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    console.log('PLACE RESERVEES:', reservationsPlaces)
    miseAJourCartePlacesReservees(reservationsPlaces);
    
    console.log('SALONS RESERVEES:', reservationsSalons)
    miseAJourCarteSalonsReserves(reservationsSalons);
  }, [reservationsPlaces, reservationsSalons]);

  //ajout d'une place
  const addPlace = async (target) => {
    console.log(formDataRef.current['rechercheDate'].value)
    let placeAjouteeASelection = {
      id: target.id,
      key: `${target.id} ${formDataRef.current['rechercheDate'].value} ${formDataRef.current['rechercheHeureDebut'].value} ${formDataRef.current['rechercheHeureFin'].value}`,
      nom: target.id.split('Place')[1],
      date: formDataRef.current['rechercheDate'].value,
      heureDebut: formDataRef.current['rechercheHeureDebut'].value,
      heureFin: formDataRef.current['rechercheHeureFin'].value,
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
  //ajout d'un salon, quasi identique à fonction ci-dessus, à modifier pour n'avoir qu'une fonction (pas le temps)
  const addSalon = async (target) => {
    console.log(formDataRef.current['rechercheDate'].value)
    let salonAjouteASelection = {
      id: target.id,
      key: `${target.id} ${formDataRef.current['rechercheDate'].value} ${formDataRef.current['rechercheHeureDebut'].value} ${formDataRef.current['rechercheHeureFin'].value}`,
      nom: target.id,
      date: formDataRef.current['rechercheDate'].value,
      heureDebut: formDataRef.current['rechercheHeureDebut'].value,
      heureFin: formDataRef.current['rechercheHeureFin'].value,
    };
    if (target.getAttribute('fill') === couleurPlaceReservee) {
      alert('salon reservé !');
      return;
    }
    if (target.getAttribute('fill') === couleurPlaceDisponible) {
      target.setAttribute('fill', couleurPlaceSelectionnee);
      setSalonsSelectionnes((prev) => {
        const update = [...prev];
        update.push(salonAjouteASelection);
        return update;
      });
      return;
    }
    if (target.getAttribute('fill') === couleurPlaceSelectionnee) {
      target.setAttribute('fill', couleurPlaceDisponible);
      setSalonsSelectionnes((prev) => {
        const update = prev.filter((el) => el.id !== target.id);
        return update;
      });
      return;
    }
  };

  //places réservées coloration du svg
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
  //salons réservés coloration du svg, quasi identique à fonction ci-dessus, à modifier pour n'avoir qu'une fonction (pas le temps)
  const miseAJourCarteSalonsReserves = (salonsReserves) => {
    for (const salonReserve of salonsReserves) {
      let heureDebutSalonReserve = salonReserve.heureDebut.substr(11, 5);
      let heureFinSalonReserve = salonReserve.heureFin.substr(11, 5);
      if ( //si on est dans l'un des cas suivants, la reservation actuelle est bien occupee sur la plage horaire selectionnee, donc colorier
        (heureDebutSalonReserve <= formData['heureDebut'] && heureFinSalonReserve >= formData['heureDebut']) ||
        (heureDebutSalonReserve <= formData['heureFin'] && heureFinSalonReserve >= formData['heureFin']) ||
        (heureDebutSalonReserve >= formData['heureDebut'] && heureFinSalonReserve <= formData['heureFin'])
      ) {
        let salonNom = salons.find((e) => e.id === salonReserve.id);
        let salonAmodifier = carteSalonsRef.current.getElementById(salonNom.nom);
        console.log(salonAmodifier);
        salonAmodifier.setAttribute('fill', couleurPlaceReservee);
      }
    }
  };

  useEffect(() => {
    console.log(placesSelectionnees)
  }, [placesSelectionnees])

//SALONS
useEffect(() => {
  console.log(salonsSelectionnes)
}, [salonsSelectionnes])







  return (
    <main>
      <div className="container">
      <p className="subsection_title">Réservation</p>
      <p className="reservation_description">Bénéficiez d'une heure offerte en réservant 3 heures ou plus comprenant les créneaux 7h-10h ou 19h-22h. Pour la journée complète (de 7h à 22h), Cela vous fait 2 heures gratuites !</p>
      <div className="flexform">
        <div id="formResearch">
          <p className="section_title2">Date et Heure</p>
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
                min="07:00" 
                max="21:45"
                step="900"
              />
            </div>
            <div id="heureFin">
              <label htmlFor="rechercheHeureFin">Heure de fin</label>
              <input
                type="time"
                id="rechercheHeureFin"
                name="rechercheHeureFin"
                min="07:15" 
                max="22:00"
                step="900"
              />
            </div>
            <button id="submitDateButton" type="submit">
              Rechercher
            </button>
          </form>
        </div>
        <div className="table_overflow">
        <p className="section_title2">Places</p>
        <CarteSvg className="carte_place_svg" ref={carteRef} />
        </div>
      </div>
      <div className="table_overflow">
        <p className="section_title2">Salons</p>
        <CarteSalonsSvg className="carte_salon_svg" ref={carteSalonsRef} />
      </div>
      <div className="legende_couleur_place">
        <p className="couleur_places_disponibles">emplacement disponible</p>
        <p className="couleur_places_selectionnees">emplacement sélectionné</p>
        <p className="couleur_places_occupees">emplacement occupée</p>
      </div>

      {((placesSelectionnees.length)>=1 || (salonsSelectionnes.length)>=1) && 
      <>
      <p className="section_title2">Résumé des places et salons sélectionnés</p>
      <div className="table_overflow">
          <table>
              <thead>
                  <tr>
                      <th></th>
                      <th>date</th>
                      <th>heure début</th>
                      <th>heure fin</th>
                  </tr>
              </thead>
              <tbody>
                  {placesSelectionnees.map((a) => {
                  return  <tr key={a.key}>
                              <td>place {a.nom}</td>
                              <td>{moment(a.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                              <td>{a.heureDebut}</td>
                              <td>{a.heureFin}</td>
                          </tr>;
                  })}
                  {salonsSelectionnes.map((a) => {
                  return  <tr key={a.key}>
                              <td>salon {a.nom}</td>
                              <td>{moment(a.date, 'YYYY-MM-DD').format('DD/MM/YYYY')}</td>
                              <td>{a.heureDebut}</td>
                              <td>{a.heureFin}</td>
                          </tr>;
                  })}
              </tbody>
          </table>
      </div>
      </>
      }   
      <Link
        to={{
          pathname: "/resume-reservation",
          placesSelectionnees: {placesSelectionnees}, // your data array of objects
          salonsSelectionnes: {salonsSelectionnes}, // your data array of objects
        }}
      >
        <div className="commande_button">Passer la commande</div>
      </Link>
      </div>
    </main>
  );
};

export default Reservation;
