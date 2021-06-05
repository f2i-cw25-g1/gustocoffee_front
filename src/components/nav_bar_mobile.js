import React from "react";

class NavBarMobile extends React.Component {
  render() {
    return (
      <nav className="nav_bar_mobile">
        <input
          type="checkbox"
          className="nav_bar_mobile_checkbox"
          id="navi-toggle"
        />
        <label htmlFor="navi-toggle" className="nav_bar_mobile_button">
          <img src="img/menu.svg" alt className="nav_bar_mobile_button_img" />
        </label>
        <div className="nav_bar_mobile_background" />
        <nav className="nav_bar_mobile_nav">
          <ul className="nav_bar_mobile_list">
            <li className="nav_bar_mobile_item">
              <a href="#" className="nav_bar_mobile_link">
                Réservation
              </a>
            </li>
            <li className="nav_bar_mobile_item">
              <a href="#" className="nav_bar_mobile_link">
                Boutique
              </a>
            </li>
            <li className="nav_bar_mobile_item">
              <a href="#" className="nav_bar_mobile_link">
                Contact
              </a>
            </li>
            <li className="nav_bar_mobile_item">
              <a href="#" className="nav_bar_mobile_link">
                Mon Compte
              </a>
            </li>
          </ul>
        </nav>
      </nav>
    );
  }
}

export default NavBarMobile;
