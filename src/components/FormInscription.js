import './css/FormInscription.css';
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


    const showErrorMessage = (errorMessage, containerId) =>{

        var div = document.createElement('div');
        div.textContent = errorMessage;
        div.className = "erreurInscription";
        document.getElementById(containerId).append(div);
    }
    
    const erreurType = (erreurMessage) => {
        if(erreurMessage.startsWith("email: ")){
            erreurMessage = erreurMessage.split("email: ")[1];
            showErrorMessage(erreurMessage, "containerInscriptionMail");
        }else if(erreurMessage.startsWith("password: ")){
            erreurMessage = erreurMessage.split("password: ")[1];
            showErrorMessage(erreurMessage, "containerInscriptionMotDePasse");
        }else if(erreurMessage.startsWith("username: ")){
            erreurMessage = erreurMessage.split("username: ")[1];
            showErrorMessage(erreurMessage, "containerInscriptionNomUtilisateur");            
        }else if(erreurMessage.startsWith("nom: ")){
            erreurMessage = erreurMessage.split("nom: ")[1];
            showErrorMessage(erreurMessage, "containerInscriptionNom"); 
        }else if(erreurMessage.startsWith("prenom: ")){
            erreurMessage = erreurMessage.split("prenom: ")[1];
            showErrorMessage(erreurMessage, "containerInscriptionPrenom"); 
        }/*else if(erreurMessage.startsWith("An exception occurred while executing 'INSERT INTO utilisateur")) {
            showErrorMessage("Une erreur est survenue", "formRegister"); 
        }*/else if(erreurMessage.startsWith("SQLSTATE[23000]")) {
            showErrorMessage("L'adresse email est déjà utilisée", "containerInscriptionMail"); 
        }
        else{
            console.log('else');
            //console.log(erreurMessage);
        }
        //showErrorMessage(erreurMessage);
    }

    const registerUser = async (event)=>{
        event.preventDefault();
        //console.log(event.target[0].value);

        const elements = document.getElementsByClassName("erreurInscription");
        while(elements.length > 0){
            elements[0].parentNode.removeChild(elements[0]);
        }

        var emailValue          = document.getElementById("inscriptionMail").value;
        var nomValue            = document.getElementById("inscriptionNom").value;
        var prenomValue         = document.getElementById("inscriptionPrenom").value;
        var nomUtilisateurValue = document.getElementById("inscriptionNomUtilisateur").value;
        var motDePasseValue     = document.getElementById("inscriptionMotDePasse").value;
        
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
                "username": nomUtilisateurValue,
                "nom": nomValue,
                "prenom": prenomValue,
                "adresse": "",
                "codePostalAdresse": null,
                "adresseFacturation": "",
                "codePostalFacturation": null,
                "paysFacturation": ""
                }
            }).then((response) => {
                console.log(response);
            }, (error) => {
                //console.log(error.response.data["hydra:description"]);
                let tableauMessagesErreur = error.response.data["hydra:description"].split("\n");
                tableauMessagesErreur.forEach((item)=>{
                    erreurType(item);
                });
            });


    }

    

    return(
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
                        <input type="mail" id="inscriptionMail" name="inscriptionMail" /*onChange={handleChange}*//>
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
    );
}

export default FormInscription;