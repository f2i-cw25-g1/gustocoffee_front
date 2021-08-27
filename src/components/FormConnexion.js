import { useForm } from "react-hook-form";
import { ErrorMessage } from '@hookform/error-message';

import './css/FormInscriptionConnexion.css';



const FormConnexion = () => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm({ criteriaMode: "all" });

    const emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    const onSubmit = data => console.log(data);

    console.log(watch("mail"));

    return (
        <div>
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