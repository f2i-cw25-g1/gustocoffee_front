import SingleProduit from '../components/SingleProduit';
import Products from "../components/Products";

function Produit() {
  return (
    <main>
      <SingleProduit/>
      <p className="subsection_title">D'autres ont aussi consulté</p>
      <Products/>
    </main>
  );
}

export default Produit;
