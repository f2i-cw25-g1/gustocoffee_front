import './Coffee.css';
import product1 from '../img/product1.png';

function Coffee() {
  return (
    <a href="#" className="item">
        <img src={product1} alt=""></img>
        <p className="">Cappucino</p>
    </a>
  );
}

export default Coffee;
