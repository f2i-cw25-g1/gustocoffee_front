import './Product.css';
import product2 from '../img/product2.png';

function Product() {
  return (
    <a href="#" className="item">
      <img src={product2} alt=""></img>
      <p>Café noire</p>
    </a>
  );
}

export default Product;
