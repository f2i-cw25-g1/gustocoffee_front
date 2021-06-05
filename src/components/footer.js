import React from "react";
import FormEmail from "./form_email";

class Footer extends React.Component {
  render() {
    return (
      <footer>
        <div>
          <a href="#">
            <img src="./img/logo.svg" alt />
          </a>
        </div>
        <div>
          <a href="#">
            <p>10 rue des lilas, Créteil 94000</p>
          </a>
          <a href="#">
            <p>01.65.38.94.23</p>
          </a>
          <a href="#">
            <p>contact@gusto-coffee.com</p>
          </a>
        </div>
        <div>
          <a href="#">
            <img src="./img/instagram.svg" alt />
          </a>
          <a href="#">
            <img src="./img/linkedin.svg" alt />
          </a>
        </div>
        <div>
          <FormEmail></FormEmail>
          <a href="#">
            <p>mentions légales</p>
          </a>
          <a href="#">
            <p>CGU</p>
          </a>
          <a href="#">
            <p>CGV</p>
          </a>
        </div>
      </footer>
    );
  }
}

export default Footer;
