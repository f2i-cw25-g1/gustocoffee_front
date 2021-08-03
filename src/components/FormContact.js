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
    <div className="flexform">
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
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.861536334096!2d2.3518551162269454!3d48.87991607928958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e6c471f6e59%3A0xd1f32f9827f1c66a!2s25%20Rue%20de%20Dunkerque%2C%2075010%20Paris!5e0!3m2!1sfr!2sfr!4v1627895142100!5m2!1sfr!2sfr" className="map" allowfullscreen="" loading="lazy"></iframe>
    </div>
  );
}

export default FormContact;
