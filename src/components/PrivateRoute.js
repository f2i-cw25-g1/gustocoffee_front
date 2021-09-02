import React, { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import { Route, Redirect } from 'react-router-dom';

/**
 * component personnalisé pour créer des routes privées
 */
const PrivateRoute = ({ path, component }) => {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? (
        <Route path={path} component={component} />
    ) : (
        <Redirect to="/inscriptionconnexion" />
    );
}

export default PrivateRoute;