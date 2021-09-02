import './css/Nav.css';
import logo from '../img/logo.svg';
import menu from '../img/menu.svg';
import profil from "../img/profil.svg";
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useContext } from 'react';
import CookieConsent from "react-cookie-consent";
import authAPI from '../services/authAPI';


import AuthContext from '../context/AuthContext';

const Nav = () => {

  let history = useHistory();

  const { isAuthenticated, setIsAuthenticated } = useContext(AuthContext);

  useEffect(() => {//au chargement de la page
    let elementsNavMobile = document.getElementsByClassName("nav_bar_mobile_item");
    for (var i = 0; i < elementsNavMobile.length; i++) {
      elementsNavMobile[i].addEventListener('click', function () {
        document.getElementById("navi-toggle").checked = false;
      }, false);
    }
  }, []);



  const handleLogout = () => {
    authAPI.logout()
    setIsAuthenticated(false);
    history.push("/inscriptionconnexion");
  }

  return (
    <>
      <div>
        <nav className="nav_bar">
          <Link className="nav_bar_link hover_effect" to='/reservation'>Réservation</Link>
          <Link className="nav_bar_link hover_effect" to='/boutique'>Boutique</Link>
          <Link className="nav_bar_link" to='/'>
            <img src={logo} alt="Logo Gusto Coffee"></img>
          </Link>
          <Link className="nav_bar_link hover_effect" to='/contact'>Contact</Link>
          {isAuthenticated ?
            <>
              <a className="nav_bar_link hover_effect a_cursor" onClick={handleLogout}>Deconnection</a>
              <Link className="nav_bar_link hover_effect" to='/moncompte'>
                <img src={profil} alt="Logo profil"></img>
              </Link>
            </> :
            <>
              <Link className="nav_bar_link hover_effect" to='/inscriptionConnexion'>
                <img src={profil} alt="Logo profil"></img>
              </Link>
            </>}
        </nav>

        <Link className="brand-logo" to="/" >
          <img className="brand-logo-img" src={logo} alt="Logo Gusto Coffee"></img>
        </Link>

        <nav className="nav_bar_mobile">
          <input type="checkbox" className="nav_bar_mobile_checkbox" id="navi-toggle"></input>
          <label htmlFor="navi-toggle" className="nav_bar_mobile_button">
            <img className="nav_bar_mobile_button_img" src={menu} alt=""></img>
          </label>
          <div className="nav_bar_mobile_background"></div>
          <nav className="nav_bar_mobile_nav">
            <ul className="nav_bar_mobile_list">
              <li className="nav_bar_mobile_item">
                <Link className="nav_bar_mobile_link" to='/reservation'>Réservation</Link>
              </li>
              <li className="nav_bar_mobile_item">
                <Link className="nav_bar_mobile_link" to='/boutique'>Boutique</Link>
              </li>
              <li className="nav_bar_mobile_item">
                <Link className="nav_bar_mobile_link" to='/contact'>Contact</Link>
              </li>
              <Link className="nav_bar_link hover_effect" to='/contact'>Déconnexion</Link>
              <li className="nav_bar_mobile_item">
                <Link className="nav_bar_mobile_link" to='/inscriptionConnexion'>
                  <img src={profil} alt="Logo profil"></img>
                </Link>
              </li>
            </ul>
          </nav>
        </nav>
        <CookieConsent
          location="bottom"
          buttonText="Accepter"
          cookieName="CookieConsentBar"
          style={{ color: "#000", background: "rgba(255, 255, 255, 0.8)" }}
          buttonStyle={{ background: "#d3d36e", color: "#000", fontSize: "13px" }}
          expires={150}

          enableDeclineButton
          declineButtonText="Refuser"
          declineButtonStyle={{ background: "#ff6060", color: "#000", fontSize: "13px" }}
        >
          Ce site utilise des cookies pour améliorer l'expérience utilisateur.
        </CookieConsent>
      </div>
    </>
  );
}

export default Nav;
