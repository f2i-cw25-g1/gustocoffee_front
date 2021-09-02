import { useForm } from "react-hook-form";
import { useState } from 'react';
import axios from "axios";
import MyVerticallyCenteredModal from "../services/ModalComponent/Modal";
import './css/FormInscriptionConnexion.css';


const FormInscription = () => {
    const [modalShow, setModalShow] = useState(false);
    const { clearErrors, register, handleSubmit, setError, watch, formState: { errors } } = useForm({ criteriaMode: "all" });
    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    //gestion des erreurs récupérée par le back-office
    // const erreurType = (erreurMessage) => {
    //     if (erreurMessage.startsWith("SQLSTATE[23000]")) {
    //         setError("mailUtilise", {
    //             type: "manual",
    //             message: "L'adresse email est déjà utilisée"
    //         });
    //     }
    //     if (erreurMessage.startsWith("email: ")) {
    //         setError("mail", { type: "manual", message: erreurMessage.replace("email: ", "") });
    //     }

    //     if (erreurMessage.startsWith("password: ")) {
    //         setError("mdp", {
    //             type: "manual",
    //             message: erreurMessage.split("password: ")[1]
    //         });
    //     }

    //     if (erreurMessage.startsWith("nom: ")) {
    //         setError("nom", {
    //             type: "manual",
    //             message: erreurMessage.split("nom: ")[1]
    //         });
    //     }
    //     if (erreurMessage.startsWith("prenom: ")) {
    //         setError("prenom", {
    //             type: "manual",
    //             message: erreurMessage.split("prenom: ")[1]
    //         });
    //     }
    //     if (erreurMessage) {
    //         setError("all", {
    //             type: "manual",
    //             message: "l'erreur suivant s'est produite : " + erreurMessage
    //         });
    //         console.log('erreur:', erreurMessage);
    //     }
    // }

    //envoi du formulaire sur le serveur
    const onSubmit = async (data) => {
        clearErrors()
        await axios({
            method: 'post',
            url: 'http://localhost:8000/api/users',
            data: {
                "email": data.mail,
                "password": data.mdp,
                "nom": data.nom,
                "prenom": data.prenom

            }
        }).then((response) => {
            console.log('response', response);
            setModalShow(true);
        }).catch((error) => {
            console.log(error)
            // if (error.response.data['hydra:description']) {
            //     //erreur identifiable
            //     let tableauMessagesErreur = error.response.data["hydra:description"].split("\n");
            //     tableauMessagesErreur.forEach((item) => {
            //         erreurType(item);
            //     });
            // } else {
            //erreur non identifiée
            // erreurType(error.response.data)
        })
    }

    return (
        <div>
            <MyVerticallyCenteredModal
                onExited={console.log('EXIT MAN')}
                body={`Votre compte a bien été crée vous allez recevoir un mail de confirmation`}
                logo={`✔️`}
                show={modalShow}
                onHide={() => setModalShow(false)} />

            <div id="formRegister">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div id="containerInscriptionNom">
                        <label htmlFor="inscriptionNom">Nom</label>
                        <input type="text" id="inscriptionNom" name="inscriptionNom" {...register("nom", {
                            required: "Le nom est obligatoire",
                            minLength: {
                                value: 2,
                                message: "Veuillez saisir un nom d'au moins 2 caractères"
                            },
                            maxLength: {
                                value: 20,
                                message: "Veuillez saisir un nom de 20 caractères maximum"
                            }
                        })} />
                        {errors.nom && <p className="erreurInscription">{errors.nom?.message}</p>}
                    </div>
                    <div id="containerInscriptionPrenom">
                        <label htmlFor="inscriptionPrenom">Prénom</label>
                        <input type="text" id="inscriptionPrenom" name="inscriptionPrenom" {...register("prenom", {
                            required: "Le prenom est obligatoire",
                            minLength: {
                                value: 2,
                                message: "Veuillez saisir un prenom d'au moins 2 caractères"
                            },
                            maxLength: {
                                value: 20,
                                message: "Veuillez saisir un prenom de 20 caractères maximum"
                            }
                        })} />
                        {errors.prenom && <p className="erreurInscription">{errors.prenom?.message}</p>}
                    </div>
                    <div id="containerInscriptionMail">
                        <label htmlFor="inscriptionMail">Adresse Email</label>
                        <input type="mail" id="inscriptionMail" name="inscriptionMail"{...register("mail", {
                            required: "L'adresse mail est obligatoire",
                            pattern: {
                                value: emailPattern,
                                message: "L'adresse mail n'est pas valide"
                            }
                        })
                        } onBlur={() => {
                            //nettoie le champ mail quand on quitte le focus de l'input
                            clearErrors("mailUtilise")
                            clearErrors("mail")
                        }
                        } />
                        {errors.mail && <p className="erreurInscription">{errors.mail?.message}</p>}
                        {errors.mailUtilise && <p className="erreurInscription">{errors.mailUtilise?.message}</p>}
                    </div>
                    <div id="containerInscriptionMotDePasse">
                        <label htmlFor="inscriptionMotDePasse">Mot de passe</label>
                        <input type="password" id="inscriptionMotDePasse" name="inscriptionMotDePasse" {...register("mdp", {
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
                        {errors.mdp && <p className="erreurInscription">{errors.mdp?.message}</p>}
                    </div>
                    <div id="containerInscriptionConfirmationMotDePasse">
                        <label htmlFor="inscriptionConfirmationMotDePasse">Confirmer le mot de passe</label>
                        <input type="password" id="inscriptionConfirmationMotDePasse" name="inscriptionConfirmationMotDePasse" {...register("mdpConfirmation", {
                            validate: (value) => value === watch("mdp") || "Les mots de passe ne correspondent pas"
                        })} />
                        {errors.mdpConfirmation && <p className="erreurInscription">{errors.mdpConfirmation?.message}</p>}

                    </div>
                    {/* {errors.all && <p className="erreurInscription">{errors.all?.message}</p>} */}
                    <button type="submit">S'inscrire</button>
                </form>
                <button type="button" onClick={() => setModalShow(true)}>Show modal</button>

            </div>
        </div>
    );
}

export default FormInscription;



