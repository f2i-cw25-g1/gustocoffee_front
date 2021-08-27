import FormConnexion from './FormConnexion';
import FormInscription from './FormInscription';

import './css/FormInscriptionConnexion.css';

const FormInscriptionConnexion = (props) => {
    return (
        <div className="flexform">
            {props.isLogin ? <FormConnexion /> : <FormInscription />}
            <button
                className="button_inscription_connexion"
                type='button'
                onClick={props.switchAuthMode}>
                {props.isLogin ? "Créer un compte" : "Se connecter"}
            </button>

        </div>
    );
}

export default FormInscriptionConnexion;