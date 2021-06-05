import React from "react";

class MenusItems extends React.Component {
  render() {
    return (
      <div className="items">
        <a href="#" className="item">
          <img src="./img/product1.png" alt />
          <p className>Cappucino</p>
        </a>
        <a href="#" className="item">
          <img src="./img/product2.png" alt />
          <p>Café noire</p>
        </a>
        <a href="#" className="item">
          <img src="./img/product3.png" alt />
          <p>Café noisette</p>
        </a>
        <a href="#" className="item">
          <img src="./img/product4.png" alt />
          <p>Mokaccino</p>
        </a>
      </div>
    );
  }
}

export default MenusItems;
