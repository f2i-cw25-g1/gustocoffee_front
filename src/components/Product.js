import "./css/Product.css";
import {Link} from 'react-router-dom';

//appelé par component AllProducts
function Product(props) {
  return (
    <Link to={`/produit/${props.id}`} className="item" key="props.key">
      <img src={props.image} alt={props.nom}></img>
      <p>{props.nom}</p>
    </Link>
  );
}

export default Product;
