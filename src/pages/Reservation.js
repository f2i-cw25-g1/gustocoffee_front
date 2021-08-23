import axios from 'axios';
import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { ReactComponent as CarteSvg } from '../img/Carte_Gusto_Coffee.svg';
import '../App.css';
import '../components/css/Reservation.css'

const Reservation = () => {
  const dummyDate = '2021-07-06';

  const date = new Date();
  const today = new Date().toISOString().slice(0, 10);

  const couleurPlaceDisponible = '#D3D36E';
  const couleurPlaceSelectionnee = '#94D36E';
  const couleurPlaceReservee = '#FF6060';

  const carteRef = useRef(null);

  const [places, setPlaces] = useState([]);
  const [reservationsPlaces, setReservationsPlaces] = useState([]);

  const [placesSelectionnees, setPlacesSelectionnees] = useState([]);

  let initialFormData = {
    date: '2021-07-06',
    heureDebut: '',
    heureFin: ''
  };

  const [formData, updateFormData] = useState(initialFormData);
  const firstUpdate = useRef(true);

  ///chaque fois que je récupère quelque chose dans mon tableau 'reservationsPLaces' donc que son état "change" , je mets a jours mes places
  /// pour ne pas executer la fonction dès le début ( car je n'ai pas de reservation ) je créer avec useRef
  /// une valeur modifiable qui existe pour la durée de vie de l'instance de composant.
  /// IMPORTANT A COMPRENDRE , sinon : https://blog.logrocket.com/usestate-vs-useref/
  useEffect(() => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
    }
    miseAJourCartePlaceReservee(reservationsPlaces);
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
  // ps; TOUJOUR un try catch 
  // ps; le Promise.ALL c'est par ceque j'ai plusieurs requet, sinon un axios.get ça suffit genre let coco = await axios.get....(endpoint) 
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



  //////////FORM ( en cours ) //////////
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

    if(document.getElementById('rechercheDate').value != formData.date){//on récupère de nouvelles réservations seulement si la date est différente
      updateFormData({
        date :       document.getElementById('rechercheDate').value,
        heureDebut : document.getElementById('rechercheHeureDebut').value,
        heureFin :   document.getElementById('rechercheHeureFin').value
      });
    }
  };

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
  const miseAJourCartePlaceReservee = (placeReservee) => {
    for (const place of placeReservee) {
      let placeNom = places.find((e) => e.id === place.id);
      let placeAmodifier = carteRef.current.getElementById(
        'Place' + placeNom.nom
      );
      placeAmodifier.setAttribute('fill', couleurPlaceReservee);
    }
  };

  return (
    <main>
      <div id="formResearch">
        <div className="load" style={{ display: 'none' }}></div>
        <form onSubmit={handleRerchercherDate}>
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

      <CarteSvg ref={carteRef} />

      <p>Places selectionnées:</p>
      {placesSelectionnees &&
        placesSelectionnees.map((a) => {
          return <ul key={a.key}>{a.nom}</ul>;
        })}
    </main>
  );
};

export default Reservation;
