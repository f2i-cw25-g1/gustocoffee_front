import axios from 'axios';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ReactComponent as CarteSvg } from '../img/Carte_Gusto_Coffee.svg';
import '../App.css';
import '../components/css/Reservation.css'

import moment from 'moment';
import DatePicker from 'react-datepicker';
import fr from 'date-fns/locale/fr';


const Reservation = () => {
  const couleurPlaceDisponible = '#D3D36E';
  const couleurPlaceSelectionnee = '#94D36E';
  const couleurPlaceReservee = '#FF6060';

  const carteRef = useRef(null);

  const [places, setPlaces] = useState([]);
  const [reservationsPlaces, setReservationsPlaces] = useState([]);

  const [placesSelectionnees, setPlacesSelectionnees] = useState([]);


  const [formData, updateFormData] = useState({});
  const firstUpdate = useRef(true);

  //remplissage du automatique du formulaire
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

    let formatedDate = moment(initialState.date, 'DD/MM/YYYY').format('YYYY-MM-DD');

    updateFormData(initialState);

    document.getElementById('rechercheDate').defaultValue = formatedDate;
    document.getElementById('rechercheHeureDebut').value = initialState.heureDebut;
    document.getElementById('rechercheHeureFin').value = initialState.heureFin;
  }, [])



  ///chaque fois que je récupère quelque chose dans mon tableau 'reservationsPLaces' donc que son état "change" , je mets a jours mes places
  /// pour ne pas executer la fonction dès le début ( car je n'ai pas de reservation ) je créer avec useRef
  /// une valeur modifiable qui existe pour la durée de vie de l'instance de composant.
  /// IMPORTANT A COMPRENDRE , sinon : https://blog.logrocket.com/usestate-vs-useref/
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    miseAJourCartePlacesReservees(reservationsPlaces);
  }, [reservationsPlaces]);

  //remet les places en vert
  //pourra etre utilise si je change la date par exemple, pour l'instant ne sert pas
  useEffect(() => {
    let touteLesPlaces = carteRef.current.getElementsByClassName('place');
    for (var i = 0; i < touteLesPlaces.length; i++) {
      touteLesPlaces[i].setAttribute('fill', couleurPlaceDisponible);
    }
  }, [formData]);

  //récupération de toute les places dans le svg, et on y ajoute un event listener dessus
  useEffect(() => {
    const placesInSvg = carteRef.current.getElementsByClassName('place');
    for (let i = 0; i < placesInSvg.length; i++) {
      placesInSvg[i].addEventListener('click', (e) => addPlace(e.target));
    }
  }, []);

  //ici on fait nos requetes ! ( qui sont des promises )
  //je dois créer un token pour 'cancel' ma requete, je vais passer mon token en 2 eme parametre dans mes deux GET qui s'enchainent
  //au lieu de faire des then si then sa je fais let a = await request1 ( en gros j'ai la 'reponse' direct quand ma promise est ok :) 
  //je set les places ( je veux conserveur leur état donc un petit useState .. un useRef aurait peut etre aussi été good vu que je recharge pas toute la page)
  //j'éxecute ma fonction et je lui passe la date mito dont nous avons besoin , celle ou ya les deux résa
  // et ENFIN le 'return' de mon useEffect en gros il va faire un truc quand je 'démonte' mon componsant , si je change de page par exemple
  // et le truc c'est quoi ? dans le 1000 émile je stop ma requete ^^
  // ps; TOUJOURS un try catch 
  // ps; le Promise.ALL c'est par ce que j'ai plusieurs requet, sinon un axios.get ça suffit genre let coco = await axios.get....(endpoint) 
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

  /*
  //inutilisé, but : quand on change la date : se met à jour sans utiliser de bouton recherche
  const handleChange = (e) => {
    updateFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  */



  const handleRerchercherDate = (e) => {
    e.preventDefault();

    //if(document.getElementById('rechercheDate').value != formData.date){//on récupère de nouvelles réservations seulement si la date est différente
    updateFormData({
      date: document.getElementById('rechercheDate').value,
      heureDebut: document.getElementById('rechercheHeureDebut').value,
      heureFin: document.getElementById('rechercheHeureFin').value
    });
    //}
  };

  //ajout d'une place
  const addPlace = async (target) => {
    let placeAjouteeASelection = {
      id: target.id,
      key: `${target.id} ${formData.date} ${formData.heureDebut} ${formData.heureFin}`,
      nom: target.id.split('Place')[1],
      date: formData.date,
      heureDebut: formData.heureDebut,
      heureFin: formData.heureFin,
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
  //récupération du nom de la place ( ex: A1)
  //coloration du svg
  const miseAJourCartePlacesReservees = (placesReservees) => {
    for (const placeReservee of placesReservees) {
      let heureDebutPlaceReservee = placeReservee.heureDebut.substr(11, 5);
      let heureFinPlaceReservee = placeReservee.heureFin.substr(11, 5);
      console.log("heure debut " + heureDebutPlaceReservee);
      console.log("formData heureDebut " + formData.heureDebut);
      console.log("heure fin " + heureFinPlaceReservee);
      console.log("formData heureFin " + formData.heureFin);

      if ( //si on est dans l'un des cas suivants, la reservation actuelle est bien occupee sur la plage horaire selectionnee, donc colorier
        (heureDebutPlaceReservee <= formData.heureDebut && heureFinPlaceReservee >= formData.heureDebut) ||
        (heureDebutPlaceReservee <= formData.heureFin && heureFinPlaceReservee >= formData.heureFin) ||
        (heureDebutPlaceReservee >= formData.heureDebut && heureFinPlaceReservee <= formData.heureFin)
      ) {
        let placeNom = places.find((e) => e.id === placeReservee.id);
        let placeAmodifier = carteRef.current.getElementById(
          'Place' + placeNom.nom
        );
        console.log(formData.date)
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
          <form onSubmit={handleRerchercherDate}>
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
              // onChange={inputsHandler}
              />
            </div>
            <div id="heureFin">
              <label htmlFor="rechercheHeureFin">Heure de fin</label>
              <input
                type="time"
                id="rechercheHeureFin"
                name="rechercheHeureFin"
              // onChange={inputsHandler}
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
        <CarteSvg className="carte_svg" ref={carteRef} />
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
