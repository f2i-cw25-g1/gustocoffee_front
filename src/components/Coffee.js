import './css/Coffee.css';
import {Link} from 'react-router-dom';

function Coffee(props) {
  return (
    <Link to={`/produit/${props.id}`} className="item" key={props.id}>
      <img src={props.image} alt=""></img>
      <p>{props.nom}</p>
    </Link>
  );
}

export default Coffee;
