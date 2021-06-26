import "./Product.css";

function Product(props) {
  return (
    <a href="#" className="item">
      <img src={props.image} alt=""></img>
      <p>{props.nom}</p>
    </a>
  );
}

export default Product;
