// CSS
import './App.css';

// Composants
import Nav from './components/Nav';
import Footer from './components/Footer';
//import SingleProduit from './components/SingleProduit';

// Pages
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import Boutique from './pages/Boutique';
import Produit from './pages/Produit';
import Contact from './pages/Contact';
import Moncompte from './pages/Moncompte';
import InscriptionConnexion from './pages/InscriptionConnexion';
import Mentionslegales from './pages/Mentionslegales';
import Error from './pages/Error';

function App() {
  return (
    <Router>
      <Nav />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/reservation" component={Reservation}/>
          <Route path="/boutique" component={Boutique}/>
          <Route path="/produit/:id" component={Produit}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/moncompte" component={Moncompte}/>
          <Route path="/inscriptionConnexion" component={InscriptionConnexion}/>
          <Route path="/mentionslegales" component={Mentionslegales}/>
          <Route component={Error} />
        </Switch>
      <Footer />
    </Router>
  );
}

export default App;
