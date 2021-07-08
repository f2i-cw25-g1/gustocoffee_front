import "./css/Product.css";
import {Link} from 'react-router-dom';

function Product(props) {
  return (
    <Link to={`/produit/${props.id}`} className="item">
      <img src={props.image} alt=""></img>
      <p>{props.nom}</p>
    </Link>
  );
}

export default Product;
