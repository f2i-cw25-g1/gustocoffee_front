import axios from "axios";
import React, { useState, useEffect } from 'react';
import { ReactComponent as CarteSvg } from '../img/Carte_Gusto_Coffee.svg';
import '../App.css';

function Reservation() {
  const date = new Date();
  const today = new Date().toISOString().slice(0, 10);
  let dateUtilisee = '2021-07-06';//today;
  let heureDebutUtilisee =date.getHours()+':00';
  let heureFinUtilisee=(date.getHours()+1)+':00';

  const couleurPlaceDisponible = "#D3D36E";
  const couleurPlaceSelectionnee = "#94D36E";
  const couleurPlaceReservee = "#FF6060";

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

  useEffect(() => {//au chargement de la page
    document.getElementById('rechercheHeureDebut').value = heureDebutUtilisee;
    document.getElementById('rechercheHeureFin').value = heureFinUtilisee;
    document.getElementById('rechercheDate').value = dateUtilisee;

    document.getElementById("submitDateButton").addEventListener("click", function(event){
      event.preventDefault()
      heureDebutUtilisee = document.getElementById('rechercheHeureDebut').value;
      heureFinUtilisee = document.getElementById('rechercheHeureFin').value;
      if(document.getElementById("rechercheDate").value != dateUtilisee){
        let touteLesPlaces = document.getElementsByClassName("place")
          for (var i = 0; i < touteLesPlaces.length; i++) {
            touteLesPlaces[i].setAttribute("fill",couleurPlaceDisponible);
        }
        dateUtilisee = document.getElementById("rechercheDate").value;
        recupererReservationsParDate();
      }
    });
    recupererPlaces();
    recupererSalons();//.then((response) => {console.log('loaded')}, (error) => {});
    recupererReservationsParDate();    
    let placesInSvg = document.getElementsByClassName("place");
    for (let i = 0; i < placesInSvg.length; i++) {
      placesInSvg[i].addEventListener('click', event => {
        addPlaceInSelectedPlaces(event.target)
      })
    }
  }, []);

  useEffect(() => {
    console.log('test')
  },[selectedPlaces]);

  const addPlaceInSelectedPlaces = (target) => {
    if(target.getAttribute('fill') == couleurPlaceReservee){
      console.log('place déja réservée')
    }else{
      let test = jsSelectedPlaces.filter(function (currentElement) {
        return currentElement.id == target.id && currentElement.date==dateUtilisee && currentElement.heureDebutUtilisee == currentElement.heureDebutUtilisee && currentElement.heureFinUtilisee == heureFinUtilisee
      });
      if(test.length){
        console.log('place deja selectionee')
        let index = jsSelectedPlaces.indexOf(test[0]);
        if (index !== -1) {
          jsSelectedPlaces.splice(index, 1);
        }
        document.getElementById(target.id).setAttribute('fill', couleurPlaceDisponible);
      }else{
        console.log('place ajoutee')
        let placeAjouteeASelection = {
          id:target.id,
          key:target.id+" "+dateUtilisee+" "+heureDebutUtilisee+" "+heureFinUtilisee,
          nom:target.id.split("Place")[1],
          date:dateUtilisee,
          heureDebutUtilisee : heureDebutUtilisee,
          heureFinUtilisee : heureFinUtilisee
        };
        document.getElementById(target.id).setAttribute('fill', couleurPlaceSelectionnee);
        jsSelectedPlaces.push(placeAjouteeASelection);
        setSelectedPlaces(jsSelectedPlaces);
      }
      console.log(jsSelectedPlaces);
    }
  }

  const recupererReservationsParDate = async (event) => {
    jsSelectedPlaces.forEach(miseAJourCartePlaceSelectionnee);
    recupererReservationsPlacesParDate(dateUtilisee).then((response) => {
      miseAJourCartePlacesReservees()
      miseAJourCarteSalonsReserves()
    }, (error) => {});;
    recupererReservationsSalonsParDate(dateUtilisee);
  }

  const recupererPlaces = async (event)=>{
    const { data } = await axios.get(`/api/place_grande_salles`);
    setPlaces(data["hydra:member"]);
    responsePlaces = data["hydra:member"];
  }

  const recupererSalons = async (event)=>{
    const { data } = await axios.get(`/api/salons`);
    setSalons(data["hydra:member"]);
    responseSalons = data["hydra:member"];
  }

  const recupererReservationsPlacesParDate = async (date, event)=>{
    const { data } = await axios.get(`/api/reservation_places?date_reservation=`+date);
    setReservationsPlaces(data["hydra:member"]);
    responseReservationsPlace = data["hydra:member"];
  }

  const recupererReservationsSalonsParDate = async (date, event)=>{
    const { data } = await axios.get(`/api/reservation_salons?date_reservation=`+date);
    setReservationsSalons(data["hydra:member"]);
    responseReservationsSalons = data["hydra:member"];
  }

  const miseAJourCartePlacesReservees = () => {
    if(!responsePlaces){
      recupererReservationsParDate();
    }
    else{
      responseReservationsPlace.forEach(miseAJourCartePlaceReservee);
    }
  }

  const miseAJourCartePlaceReservee = (placeReservee) => {
      placeReservee.nom = responsePlaces.find(element => element.id == placeReservee.placeGrandeSalle.split("/api/place_grande_salles/")[1]).nom
      if(document.getElementById("Place"+placeReservee.nom)){
        document.getElementById("Place"+placeReservee.nom).setAttribute("fill",couleurPlaceReservee)
      }
  }

  const miseAJourCartePlaceSelectionnee = (placeSelectionnee) =>{
    if(placeSelectionnee.date == dateUtilisee){
      document.getElementById(placeSelectionnee.id).setAttribute("fill",couleurPlaceSelectionnee);
    }
  }

  const miseAJourCarteSalonsReserves=() => {
    
  }

  return (
    <main>
      <div id="formResearch">
        <div className="load" style={{display:"none"}}></div>
        <form onSubmit={recupererReservationsParDate}>
            <div id="containerDate">
                <label htmlFor="rechercheDate">Date</label>
                <input type="date" id="rechercheDate" name="rechercheDate" />
            </div>    
            <div id="heureDebut">
                <label htmlFor="rechercheHeureDebut">Heure de début</label>
                <input type="time" id="rechercheHeureDebut" name="rechercheHeureDebut" />
            </div>
            <div id="heureFin">
                <label htmlFor="rechercheHeureFin">Heure de fin</label>
                <input type="time" id="rechercheHeureFin" name="rechercheHeureFin" />
            </div>
            <button id="submitDateButton" type="submit">Rechercher</button>
        </form>
      </div>
        
        <CarteSvg/>

        {/* <p>{JSON.stringify(selectedPlaces)}</p> */}
        {selectedPlaces.map((a) =>{
            return(
              <div key={a.key}>
                {a.nom}
              </div>
            );
        })}
            
    </main>
  );
}

export default Reservation;
