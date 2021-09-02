import axios from "axios"
import jwtDecode from "jwt-decode"

//suppression du token
const logout = () => {
    localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

//vérification si il y a déja un token dans le local storage au démarrage pour l'utiliser
const setup = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            setAxiosToken(token);
        }
    }
}

//vérification si il y a un token 
const isAuthenticated = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
        const { exp: expiration } = jwtDecode(token);
        if (expiration * 1000 > new Date().getTime()) {
            return true
        }
        return false
    }
    return false
}

//set du token dans une méthode pour éviter la répétion de code
const setAxiosToken = (token) => {
    axios.defaults.headers["Authorization"] = "Bearer" + token;
}

//récupération du JWT si les credentials sont exacts
const authenticate = async (credentials) => {
    return axios
        .post('http://localhost:8000/api/login_check', { "username": credentials.username, "password": credentials.password })
        .then(response => {
            console.log('response', response);
            return response.data.token
        })
        .then(token => {
            //stockage du token dans le local storage
            localStorage.setItem("authToken", token)
            //on prévient axios qu'on a un header par défaut sur toutes nos futures requetes HTTP
            setAxiosToken(token);

            return true;
        })
        .catch(error => false);
}

const exportedObject = {
    authenticate,
    logout,
    setup,
    isAuthenticated
};

export default exportedObject;
