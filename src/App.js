import { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from 'react-router-dom';

// Composants
import Nav from './components/Nav';
import Footer from './components/Footer';

// Services
import AuthAPI from "./services/authAPI";

// Pages
import Home from './pages/Home';
import Reservation from './pages/Reservation';
import ReservationResumeSelection from './pages/ReservationResumeSelection';
import Salons from './pages/Salons';
import Salon from './pages/Salon';
import Boutique from './pages/Boutique';
import Produit from './pages/Produit';
import Contact from './pages/Contact';
import MonCompte from './pages/MonCompte';
import InscriptionConnexion from './pages/InscriptionConnexion';
import Mentionslegales from './pages/Mentionslegales';
import CGU from './pages/CGU';
import CGV from './pages/CGV';
import Error from './pages/Error';

import PrivateRoute from './components/PrivateRoute';

// CSS
import './App.css';

import AuthContext from "./context/AuthContext";

//verification de l'authentification au démarrage de l'applicatoin
AuthAPI.setup();

//pour avoir la props 'history' dans ma nav bar qui n'est pas un component Route
const NavBarWithRouter = withRouter(Nav);


const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(AuthAPI.isAuthenticated())

  //valeur qu'on va pouvoir fournir à tout les components encapsulé
  const contextValue = {
    isAuthenticated,
    setIsAuthenticated
  };

  return (
    <AuthContext.Provider value={contextValue}>
      <Router>
        <NavBarWithRouter />
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/moncompte" component={MonCompte} />
          <PrivateRoute path="/resume-reservation" component={ReservationResumeSelection} />
          <Route path="/reservation" component={Reservation} />
          <Route path="/salons" component={Salons} />
          <Route path="/salon/:id" component={Salon} />
          <Route path="/boutique" component={Boutique} />
          <Route path="/produit/:id" component={Produit} />
          <Route path="/contact" component={Contact} />
          <Route path="/inscriptionconnexion" component={InscriptionConnexion} />
          <Route path="/mentionslegales" component={Mentionslegales} />
          <Route path="/cgu" component={CGU} />
          <Route path="/cgv" component={CGV} />
          <Route component={Error} />
        </Switch>
        <Footer />
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
