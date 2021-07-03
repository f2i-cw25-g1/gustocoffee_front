import axios from "axios";
/*import {useState} from "react";*/

function FormInscription(){
    /*    
        const [emailValue,setEmailValue] = useState();
    
        const handleChange = (event) =>{
            console.log(event.target.value);
            setEmailValue(event.target.value);
        }
    */    
        // 
    
    const registerUser = async (event)=>{
        event.preventDefault();
        console.log(event.target[0].value);

        var emailValue = document.getElementById("mail").value;
        var nomValue = document.getElementById("nom").value;
        var prenomValue = document.getElementById("prenom").value;
        var motDePasseValue = document.getElementById("mot_de_passe").value;
        await axios({
            method: 'post',
            url: '/api/utilisateurs',
            data: {
                "email": emailValue,
                "roles": [
                    "user"
                ],
                "password": motDePasseValue,
                "factures": [],
                "username": "string",
                "nom": nomValue,
                "prenom": prenomValue,
                "adresse": "string",
                "codePostalAdresse": 0,
                "adresseFacturation": "string",
                "codePostalFacturation": 0,
                "paysFacturation": "string"
                }
            }).then((response) => {
                console.log(response);
            }, (error) => {
                console.log(error.response.data["hydra:description"]);
            });
    }

    return(
            <div>
            <form onSubmit={registerUser}>
            <label htmlFor="nom">Nom</label>
            <input type="text" id="nom" name="nom" />

            <label htmlFor="prenom">Prénom</label>
            <input type="text" id="prenom" name="prenom" />

            <label htmlFor="adresse_mail">Adresse Email</label>
            <input type="mail" id="mail" name="mail" /*onChange={handleChange}*//>

            <label htmlFor="mot_de_passe">Mot de passe</label>
            <input type="password" id="mot_de_passe" name="mot_de_passe" />

            <label htmlFor="confirmation_mot_de_passe">Confirmer le mot de passe</label>
            <input type="password" id="confirmation_mot_de_passe" name="confirmation_mot_de_passe" />

            <button type="submit">S'inscrire</button>
            </form>

        </div>
    );
}

export default FormInscription;