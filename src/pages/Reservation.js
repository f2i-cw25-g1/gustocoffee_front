import axios from "axios";
import React, { useState, useEffect } from 'react';
import { ReactComponent as CarteSvg } from '../img/Carte_Gusto_Coffee.svg';


function Reservation() {
  const today = new Date().toISOString().slice(0, 10);
  let dateUtilisee = today;
  //données à la date : 2021-07-06

  const [places, setPlaces] = useState([]);
  const [salons, setSalons] = useState([]);
  const [reservationsPlace, setReservationsPlaces] = useState([]);
  const [reservationsSalons, setReservationsSalons] = useState([]);

  useEffect(() => {//au chargement de la page
    recupererPlaces();
    recupererSalons();
    recupererReservationsParDate();
    miseAJourCarte();
  }, []);

  const recupererReservationsParDate = () => {
    dateUtilisee = document.getElementById("rechercheDate").value;
    console.log('recuperation donnees');
    console.log(dateUtilisee);// vide, à voir pourquoi
    recupererReservationsPlacesParDate('2021-07-06');
    recupererReservationsSalonsParDate('2021-07-06');
  }

  const recupererPlaces = async (event)=>{
    const { data } = await axios.get(`/api/place_grande_salles`);
    console.log(data["hydra:member"]);
    setPlaces(data["hydra:member"]);
  }

  const recupererSalons = async (event)=>{
    const { data } = await axios.get(`/api/salons`);
    console.log(data["hydra:member"]);
    setSalons(data["hydra:member"]);
  }

  const recupererReservationsPlacesParDate = async (date, event)=>{
    const { data } = await axios.get(`/api/reservation_places?date_reservation=`+date);
    console.log(data["hydra:member"]);
    setReservationsPlaces(data["hydra:member"]);
  }

  const recupererReservationsSalonsParDate = async (date, event)=>{
    const { data } = await axios.get(`/api/reservation_salons?date_reservation=`+date);
    console.log(data["hydra:member"]);
    setReservationsSalons(data["hydra:member"]);
  }

  const miseAJourCarte=() => {
    miseAJourCartePlaces();
    miseAJourCarteSalons();
  }

  const miseAJourCartePlaces=() => {
    console.log("miseAJourCartePlaces");
    reservationsPlace.forEach(miseAJourCartePlace)
  }

  const miseAJourCartePlace=(item) => {
    console.log("test")
    let a = item.placeGrandeSalle.split('/api/place_grande_salles/')[1];
    console.log(places.filter(obj=>{return obj.id === a}).nom);
  }

  const miseAJourCarteSalons=() => {
    
  }

  return (
    <main>
      <div id="formResearch">
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
                <button type="submit">Rechercher</button>
            </form>
        </div>
        
        <CarteSvg/>

    </main>
  );
}

export default Reservation;
