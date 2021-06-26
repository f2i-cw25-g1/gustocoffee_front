import "./Product.css";
import product2 from "../img/product2.png";

function Product(props) {
  return (
    <a href="#" className="item">
      <img src={product2} alt=""></img>
      <p>{props.nom}</p>
      <p>{props.description}</p>
    </a>
  );
}

export default Product;
