import FormInscription from "./FormInscription";
import FormConnexion from "./FormConnexion";
import { useState } from 'react';

function FormInscriptionConnexion() {
    const [isLogin, setIsLogin] = useState(true);
    const loginUser = (e) => {
        console.log(e);
    }
    const registerUser = (e) => {
        console.log(e)
    }
    const switchAuthModeHandler = () => {
        setIsLogin((prevState) => !prevState);
    };

    return (
        <div className="flexform">
            {isLogin &&
                <div>
                    <p className="subsection_title">Connexion</p>
                    <form onSubmit={loginUser}>
                        <label htmlFor="adresse_mail">Adresse Email</label>
                        <input type="mail" id="mail" name="mail" />

                        <label htmlFor="mot_de_passe">Mot de passe</label>
                        <input type="password" id="mot_de_passe" name="mot_de_passe" />

                        <button type="submit">Se connecter</button>
                    </form>
                </div>
            }

            {!isLogin &&
                <div>
                    <p className="subsection_title">Inscription</p>
                    <div id="formRegister">
                        <form onSubmit={registerUser}>
                            <div id="containerInscriptionNom">
                                <label htmlFor="inscriptionNom">Nom</label>
                                <input type="text" id="inscriptionNom" name="inscriptionNom" />
                            </div>
                            <div id="containerInscriptionPrenom">
                                <label htmlFor="inscriptionPrenom">Prénom</label>
                                <input type="text" id="inscriptionPrenom" name="inscriptionPrenom" />
                            </div>
                            <div id="containerInscriptionNomUtilisateur">
                                <label htmlFor="inscriptionNomUtilisateur">Nom d'utilisateur</label>
                                <input type="text" id="inscriptionNomUtilisateur" name="nomUtilisateur" />
                            </div>
                            <div id="containerInscriptionMail">
                                <label htmlFor="inscriptionMail">Adresse Email</label>
                                <input type="mail" id="inscriptionMail" name="inscriptionMail" />
                            </div>
                            <div id="containerInscriptionMotDePasse">
                                <label htmlFor="inscriptionMotDePasse">Mot de passe</label>
                                <input type="password" id="inscriptionMotDePasse" name="inscriptionMotDePasse" />
                            </div>
                            <div id="containerInscriptionConfirmationMotDePasse">
                                <label htmlFor="inscriptionConfirmationMotDePasse">Confirmer le mot de passe</label>
                                <input type="password" id="inscriptionConfirmationMotDePasse" name="inscriptionConfirmationMotDePasse" />
                            </div>
                            <button type="submit">S'inscrire</button>
                        </form>
                    </div>
                </div>
            }

            <button
                className="button_inscription_connexion"
                type='button'
                onClick={switchAuthModeHandler}
            >
                {isLogin ? 'Créer un compte' : "J'ai déjà un compte"}
            </button>
        </div>
    );
}

export default FormInscriptionConnexion;