import './Footer.css';
import logo from '../img/logo.svg';
import instagram from '../img/instagram.svg';
import linkedin from '../img/linkedin.svg';
import {Link} from 'react-router-dom';

function Footer() {
  return (
    <div>
      <footer>
        <div>
          <Link to='/'>
            <img src={logo} alt=""></img>
          </Link>
        </div>
        <div>
          <a href="#"><p>10 rue des lilas, Créteil 94000</p></a>
          <a href="#"><p>01.65.38.94.23</p></a>
          <a href="#"><p>contact@gusto-coffee.com</p></a>
        </div>
        <div>
          <a href="#"><img src={instagram} alt=""></img></a>
          <a href="#"><img src={linkedin} alt=""></img></a>
        </div>
        <div>
          <form action="">
            <input placeholder="Votre Mail" type="email"></input>
            <button type="submit">S'inscrire</button>
          </form>
          <Link to='/mentionslegales'><p>mentions légales</p></Link>
          <a href="#"><p>CGU</p></a>
          <a href="#"><p>CGV</p></a>
        </div>
      </footer>

      <p className="copyright">Gusto Coffee © 2021</p>
    </div>
  );
}

export default Footer;
