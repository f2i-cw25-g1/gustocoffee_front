import './css/Nav.css';
import logo from '../img/logo.svg';
import menu from '../img/menu.svg';
import profil from "../img/profil.svg";
import {Link} from 'react-router-dom';

function Nav() {
  return (
    <div>
    <nav className="nav_bar">
      <Link className="nav_bar_link hover_effect" to='/reservation'>Réservation</Link>
      <Link className="nav_bar_link hover_effect" to='/boutique'>Boutique</Link>
      <Link className="nav_bar_link" to='/'>
        <img src={logo} alt="Logo Gusto Coffee"></img>
      </Link>
      <Link className="nav_bar_link hover_effect" to='/contact'>Contact</Link>
      <Link className="nav_bar_link hover_effect" to='/inscriptionConnexion'>
        <img src={profil} alt="Logo profil"></img>
      </Link>
    </nav>

    <Link className="brand-logo" to='/'>
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
          <li className="nav_bar_mobile_item">
          <Link className="nav_bar_mobile_link" to='/inscriptionConnexion'>
            <img src={profil} alt="Logo profil"></img>
          </Link>
          </li>
        </ul>
      </nav>
    </nav>
    </div>
  );
}

export default Nav;
