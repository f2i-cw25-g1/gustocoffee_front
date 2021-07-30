import "./css/Salon.css";
import {Link} from 'react-router-dom';

function Salon(props) {
  return (
    <Link to={`/salon/${props.id}`} className="salon" key="props.key">
      <img src={props.image} alt=""></img>
      <p>{props.nom}</p>
    </Link>
  );
}

export default Salon;
