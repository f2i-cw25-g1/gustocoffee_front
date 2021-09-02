import FormConnexion from './FormConnexion';
import FormInscription from './FormInscription';

import './css/FormInscriptionConnexion.css';

const FormInscriptionConnexion = ({ isSelectLogin, switchAuthMode }) => {
    return (
        <div className="flexform">
            {isSelectLogin ? <FormConnexion /> : <FormInscription />}
            <button
                className="button_inscription_connexion"
                type='button'
                onClick={switchAuthMode}>
                {isSelectLogin ? "Créer un compte" : "Se connecter"}
            </button>

        </div>
    );
}

export default FormInscriptionConnexion;