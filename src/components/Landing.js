import './css/Landing.css';
import {Link} from 'react-router-dom';
//appelé par la page home (page accueil) affiche l'image et texte "votre espace de coworking" sur la page avant de scroll
function Landing() {
  return (
    <div className="landing">
      <div className="catch_phrase">
        <h1 className="title">Gusto Coffee</h1>
        <h2 className="subtitle">Votre espace de coworking</h2>
      </div>
      <Link className="main_button" to='/reservation'>Réserver</Link>
    </div>
  );
}

export default Landing;
