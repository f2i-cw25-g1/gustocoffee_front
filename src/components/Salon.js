import "./css/Salon.css";
import {Link} from 'react-router-dom';

//Composant appelé par le composant AllSalons, Affiche salon par salon
function Salon(props) {
  return (
    <Link to={`/salon/${props.id}`} className="salon" key="props.key">
      <img src={props.image} alt=""></img>
      <div>
        <p>Nom : {props.nom}</p>
        <p>Capacité : {props.capacite} personnes</p>
      </div>
    </Link>
  );
}

export default Salon;
