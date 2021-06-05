import React from "react";
import MenusItems from "./menus_items";
import ProductsItems from "./products_items";

class Main extends React.Component {
  render() {
    return (
      <main>
        <section className="bienvenue">
          <div className="bienvenue_text">
            <h2 className="section_title">
              Bienvenue au Gusto Coffe votre espace de coworking
            </h2>
            <p className="section_text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit
              suspendisse risus, volutpat, at orci et. Massa aliquam nec, sapien
              sit sed facilisi pulvinar viverra tortor.
            </p>
          </div>
          <div className="bienvenue_image">
            <img className="bienvenue_img" src="./img/image1.jpg" alt />
          </div>
        </section>
        <p className="subsection_title">Nos Salles</p>
        <section className="bienvenue">
          <div className="bienvenue_image">
            <img className="bienvenue_img2" src="./img/image2.jpg" alt />
          </div>
          <div className="bienvenue_text">
            <h2 className="section_title">
              Découvrez notre salon de 120 places
            </h2>
            <p className="section_text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis
              fringilla massa eu risus mauris dignissim. Consectetur est viverra
              eget eu.
            </p>
            <a className="sub_button" href="#">
              Réserver une place
            </a>
          </div>
        </section>
        <section className="bienvenue">
          <div className="bienvenue_image">
            <img className="bienvenue_img2" src="./img/image3.jpg" alt />
          </div>
          <div className="bienvenue_text">
            <h2 className="section_title">
              Découvrez nos salons de 4 à 6 places
            </h2>
            <p className="section_text">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Potenti
              consectetur mauris mattis habitant ullamcorper nullam. Sed id sed
              eu viverra pellentesque massa fringilla donec.
            </p>
            <a className="sub_button" href="#">
              Réserver un salon
            </a>
          </div>
        </section>
        <p className="subsection_title">Notre Menu</p>
        <MenusItems></MenusItems>
        <div className="center">
          <a href="#" className="sub_button2">
            Boutique
          </a>
        </div>
        <p className="subsection_title">Nos Produits</p>
        <ProductsItems></ProductsItems>
        <div className="center">
          <a href="#" className="sub_button2">
            Boutique
          </a>
        </div>
      </main>
    );
  }
}

export default Main;
