import "./css/Main.css";
import Products from "./Products";
import image1 from "../img/image1.jpg";
import image2 from "../img/image2.jpg";
import image3 from "../img/image3.jpg";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <>
      <main>
        <section className="bienvenue">
          <div className="bienvenue_text">
            <h2 className="section_title">
              Bienvenue au Gusto Coffee, votre espace de coworking Gare du Nord
            </h2>
            <p className="section_text">
              Gusto Coffee élargit son offre et vous propose désormais des espaces de travail. Vous êtes à la recherche d'un lieu convivial afin de travailler seul ou en équipe ? Découvrez notre grande salle ainsi que nos salons.
            </p>
          </div>
          <div className="bienvenue_image">
            <img className="bienvenue_img" src={image1} alt="Présentation de l'espace Gusto Coffee"></img>
          </div>
        </section>

        <p className="subsection_title">Nos Salles</p>

        <section className="bienvenue">
          <div className="bienvenue_image">
            <img className="bienvenue_img2" src={image2} alt="Présentation du grand salon Gusto Coffee"></img>
          </div>
          <div className="bienvenue_text">
            <h2 className="section_title">Découvrez notre salon de 120 places</h2>
            <p className="section_text">
              Vous êtes travailleur indépendant et souhaitez dissocier lieu de travail et domicile ? Venez essayer notre salon designé pour la réflexion mais aussi la rencontre.
            </p>
            <Link className="sub_button" to="/reservation">
              Réserver une place
            </Link>
          </div>
        </section>

        <section className="bienvenue">
          <div className="bienvenue_image">
            <img className="bienvenue_img2" src={image3} alt="Présentation des salons Gusto Coffee"></img>
          </div>
          <div className="bienvenue_text">
            <h2 className="section_title">
              Découvrez nos salons de 4 à 6 places
            </h2>
            <p className="section_text">
              Véritable havre de paix à quelques pas de la gare du Nord, Gusto Coffee dispose d'espaces conçus pour répondre à vos besoins : coworking, révisions, réunions... Tout est à votre disposition.
            </p>
            <Link className="sub_button" to="/salons">
              Découvrez nos salons
            </Link>
          </div>
        </section>

        <p className="subsection_title">Nos Cafés</p>

        <Products
          categorie="http://localhost:8000/categories/1"
        />

        <div className="center">
          <Link className="sub_button2" to="/boutique">
            Boutique
          </Link>
        </div>

        <p className="subsection_title">Nos Produits dérivés</p>

        <Products
          categorie="http://localhost:8000/categories/6"
        />

        <div className="center">
          <Link className="sub_button2" to="/boutique">
            Boutique
          </Link>
        </div>
      </main>
    </>
  );
}

export default Main;
