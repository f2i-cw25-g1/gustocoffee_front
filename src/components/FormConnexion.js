import { useForm } from "react-hook-form";
import { useState } from 'react';
import axios from "axios";
import { ErrorMessage } from '@hookform/error-message';
import MyVerticallyCenteredModal from "./Modal";
import './css/FormInscriptionConnexion.css';



const FormConnexion = () => {
    const [modalShow, setModalShow] = useState(false);
    const { clearErrors, register, handleSubmit, setError, watch, formState: { errors } } = useForm({ criteriaMode: "all" });
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //gestion des erreurs récupérée par le back-office
    const erreurType = (erreurMessage) => {
        if (erreurMessage.startsWith("email: ")) {
            setError("mail", { type: "manual", message: erreurMessage.replace("email: ", "") });
        }

        if (erreurMessage.startsWith("password: ")) {
            setError("mdp", {
                type: "manual",
                message: erreurMessage.split("password: ")[1]
            });
        }
        if (erreurMessage) {
            setError("all", {
                type: "manual",
                message: "l'erreur suivant s'est produite : " + erreurMessage
            });
            console.log('erreur:', erreurMessage);
        }
    }

    //envoi du formulaire sur le serveur
    const onSubmit = async (data) => {
        clearErrors()
        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/login_check',
            data: {
                "email": data.mail,
                "password": data.mdp,
            }
        }).then((response) => {
            console.log('response', response);
            setModalShow(true);
        }).catch((error) => {
            if (error.response.data['hydra:description']) {
                //erreur identifiable
                let tableauMessagesErreur = error.response.data["hydra:description"].split("\n");
                tableauMessagesErreur.forEach((item) => {
                    erreurType(item);
                });
            } else {
                //erreur non identifiée
                erreurType(error.response.data)
            }
        })
    }




    return (
        <div>
            <MyVerticallyCenteredModal
                onExited={console.log('EXIT MAN')}
                body={`Vous êtes connecté !`}
                logo={`✔️`}
                show={modalShow}
                onHide={() => setModalShow(false)} />
            <div className="flexform">
                <form onSubmit={handleSubmit(onSubmit)}>

                    <div>
                        <label htmlFor="adresse_mail">Adresse Email</label>
                        <input type="mail" id="mail" name="mail" placeholder="Entrez votre adresse e-mail" {...register("mail", {
                            required: "Merci de saisir votre email",
                            pattern: {
                                value: emailPattern,
                                message: "Veuillez entrer une adresse mail valide"
                            }
                        })} />

                        <ErrorMessage errors={errors} name="mail" as="div" className="erreurInscription">
                            {({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <p key={type}>{message}</p>
                                ))
                            }
                        </ErrorMessage>

                    </div>

                    <div>
                        <label htmlFor="mot_de_passe">Mot de passe</label>
                        <input type="password" id="mot_de_passe" name="mot_de_passe" placeholder="Entrez un mot de passe (entre 8 et 20 caractères)" {...register("mdp", {
                            required: "Le mot de passe est obligatoire",
                            maxLength: {
                                value: 20,
                                message: "Veuillez saisir un mot de passe de 20 caractères maximum"
                            },
                            minLength: {
                                value: 8,
                                message: "Veuillez saisir un mot de passe d'au moins 8 caractères"
                            },
                        })} />

                        <ErrorMessage errors={errors} name="mdp" as="div" className="erreurInscription">
                            {({ messages }) =>
                                messages &&
                                Object.entries(messages).map(([type, message]) => (
                                    <p key={type}>{message}</p>
                                ))
                            }
                        </ErrorMessage>
                    </div>

                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    );
}

export default FormConnexion;