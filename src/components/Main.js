import './Main.css';
import Coffees from './Coffees';
import Products from './Products';
import image1 from '../img/image1.jpg';
import image2 from '../img/image2.jpg';
import image3 from '../img/image3.jpg';
import {Link} from 'react-router-dom';

function Main() {
  return (
    <main>
      <section className="bienvenue">
        <div className="bienvenue_text">
          <h2 className="section_title">Bienvenue au Gusto Coffe votre espace de coworking</h2>
          <p className="section_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit suspendisse risus, volutpat, at orci et. Massa aliquam nec, sapien sit sed facilisi pulvinar viverra tortor.</p>
        </div>
        <div className="bienvenue_image">
          <img className="bienvenue_img" src={image1} alt=""></img>
        </div>
      </section>

      <p className="subsection_title">Nos Salles</p>

      <section className="bienvenue">
        <div className="bienvenue_image">
          <img className="bienvenue_img2" src={image2} alt=""></img>
        </div>
        <div className="bienvenue_text">
          <h2 className="section_title">Découvrez notre salon de 120 places</h2>
          <p className="section_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Iaculis fringilla massa eu risus mauris dignissim. Consectetur est viverra eget eu.</p>
          <Link className="sub_button" to='/reservation'>Réserver une place</Link>
        </div>
      </section>

      <section className="bienvenue">
        <div className="bienvenue_image">
          <img className="bienvenue_img2" src={image3} alt=""></img>
        </div>
        <div className="bienvenue_text">
          <h2 className="section_title">Découvrez nos salons de 4 à 6 places</h2>
          <p className="section_text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Potenti consectetur mauris mattis habitant ullamcorper nullam. Sed id sed eu viverra pellentesque massa fringilla donec.</p>
          <Link className="sub_button" to='/reservation'>Réserver un salon</Link>
        </div>
      </section>

      <p className="subsection_title">Notre Menu</p>

      <Coffees />

      <div className="center">
        <Link className="sub_button2" to='/boutique'>Boutique</Link>
      </div>

      <p className="subsection_title">Nos Produits</p>

      <Products />

      <div className="center">
        <Link className="sub_button2" to='/boutique'>Boutique</Link>
      </div>
    </main>
  );
}

export default Main;
