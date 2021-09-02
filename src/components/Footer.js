import './css/Footer.css';
import logo from '../img/logo.svg';
import instagram from '../img/instagram.svg';
import linkedin from '../img/linkedin.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <>
      <div>
        <footer>
          <div className="footer_logo">
            <Link to='/'>
              <img src={logo} alt=""></img>
            </Link>
          </div>
          <div className="footer_infos">
            <a href="https://www.google.com/maps/place/25+Rue+de+Dunkerque,+75010+Paris/@48.8799161,2.3518551,17z/data=!3m1!4b1!4m5!3m4!1s0x47e66e6c471f6e59:0xd1f32f9827f1c66a!8m2!3d48.8799161!4d2.3540438" target="_blank" rel="noreferrer"><p>25 rue de Dunkerque, Paris 75010</p></a>
            <a href="tel:0165389423"><p>01.65.38.94.23</p></a>
            <a href="mailto:gustocoffee75@gmail.com" target="_blank" rel="noreferrer"><p>gustocoffee75@gmail.com</p></a>
          </div>
          <div className="footer_social">
            <a href="https://www.instagram.com/gustocoffee75" target="_blank" rel="noreferrer"><img src={instagram} alt="Instagram"></img></a>
            <a href="https://www.linkedin.com/in/gusto-coffee-5684a6208/" target="_blank" rel="noreferrer"><img src={linkedin} alt="LinkedIn"></img></a>
          </div>
          <div className="footer_form">
            <form action="">
              <input placeholder="Votre Mail" type="email"></input>
              <button type="submit">S'inscrire</button>
            </form>
            <Link to='/mentionslegales'><p>mentions légales</p></Link>
            <Link to='/CGU'><p>CGU</p></Link>
            <Link to='/CGV'><p>CGV</p></Link>
          </div>
        </footer>

        <p className="copyright">Gusto Coffee © 2021 - réalisé par DevProd</p>
      </div>
    </>
  );
}

export default Footer;
