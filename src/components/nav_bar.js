import React from "react";

class NavBar extends React.Component {
  render() {
    return (
      <nav className="nav_bar">
        <a className="nav_bar_link hover_effect" href="#">
          Réservation
        </a>
        <a className="nav_bar_link hover_effect" href="#">
          Boutique
        </a>
        <a className="nav_bar_link" href>
          <img src="img/logo.svg" alt />
        </a>
        <a className="nav_bar_link hover_effect" href="#">
          Contact
        </a>
        <a className="nav_bar_link hover_effect" href="#">
          Mon Compte
        </a>
      </nav>
    );
  }
}

export default NavBar;
