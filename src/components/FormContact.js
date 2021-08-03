import './css/FormContact.css';
import React, { useEffect } from 'react';

function FormContact() {
const mailto = "gustocoffee75@gmail.com";

useEffect(() => {//au chargement de la page
  document.getElementById("sendMailButton").addEventListener("click", function(event){
    if(document.getElementById('mailMessage').value==""){
      console.log("champ message non rempli")
    }
    else if(document.getElementById('mailPrenom').value==""){
      console.log("champ prénom non rempli")
    }
    else if(document.getElementById('mailNom').value==""){
      console.log("champ nom non rempli")
    }
      else{
      let mailSubject = "De "+document.getElementById('mailNom').value+" "+document.getElementById('mailPrenom').value+", contact Gusto Coffee";
      let mailBody = document.getElementById('mailMessage').value;
      window.open('mailto:'+mailto+'?subject='+mailSubject+'&body='+mailBody);
    }
    // window.open('mailto:'+mailto+'?subject='+mailSubject+'&body='+mailBody);
  });
}, []);

  return (
    <div>
        <form action="">
            <label htmlFor="mailNom">Nom</label>
            <input id="" type="text" id="mailNom" name="mailNom" required/>

            <label htmlFor="mailPrenom">Prénom</label>
            <input type="text" id="mailPrenom" name="mailPrenom" required/>

            {/* <label htmlFor="mail">Adresse Mail</label>
            <input type="mail" id="mail" name="mail" /> */}

            <label htmlFor="mailMessage">Message</label>
            <textarea type="text" id="mailMessage" name="mailMessage" required/>

            <button id="sendMailButton">Envoyer</button>
        </form>
    </div>
  );
}

export default FormContact;
