import React from "react";

class ProductsItems extends React.Component {
  render() {
    return (
      <div className="items">
        <a href="#" className="item">
          <img src="./img/product1.png" alt />
          <p>Mug Gusto Coffee</p>
        </a>
        <a href="#" className="item">
          <img src="./img/product2.png" alt />
          <p>Coque Smartphone</p>
        </a>
        <a href="#" className="item">
          <img src="./img/product3.png" alt />
          <p>Tee-Shirts</p>
        </a>
        <a href="#" className="item">
          <img src="./img/product4.png" alt />
          <p>Stickers</p>
        </a>
      </div>
    );
  }
}

export default ProductsItems;
