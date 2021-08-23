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
import ReservationResumeSelection from './pages/ReservationResumeSelection';
import Salons from './pages/Salons';
import Salon from './pages/Salon';
import Boutique from './pages/Boutique';
import Produit from './pages/Produit';
import Contact from './pages/Contact';
import Moncompte from './pages/Moncompte';
import InscriptionConnexion from './pages/InscriptionConnexion';
import Mentionslegales from './pages/Mentionslegales';
import CGU from './pages/CGU';
import CGV from './pages/CGV';
import Error from './pages/Error';

function App() {
  return (
    <Router>
      <Nav />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/reservation" component={Reservation}/>
          <Route path="/resume-reservation" component={ReservationResumeSelection}/>
          <Route path="/salons" component={Salons}/>
          <Route path="/salon/:id" component={Salon}/>
          <Route path="/boutique" component={Boutique}/>
          <Route path="/produit/:id" component={Produit}/>
          <Route path="/contact" component={Contact}/>
          <Route path="/moncompte" component={Moncompte}/>
          <Route path="/inscriptionConnexion" component={InscriptionConnexion}/>
          <Route path="/mentionslegales" component={Mentionslegales}/>
          <Route path="/cgu" component={CGU}/>
          <Route path="/cgv" component={CGV}/>
          <Route component={Error} />
        </Switch>
      <Footer />
    </Router>
    
  );
}

export default App;
