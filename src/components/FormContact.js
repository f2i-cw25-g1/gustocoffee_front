import './FormContact.css';

function FormContact() {
  return (
    <div>
        <form action="">
            <label htmlFor="nom">Nom</label>
            <input type="text" id="nom" name="nom" />

            <label htmlFor="prenom">Prénom</label>
            <input type="text" id="prenom" name="prenom" />

            <label htmlFor="mail">Adresse Mail</label>
            <input type="mail" id="mail" name="mail" />

            <label htmlFor="message">Message</label>
            <input type="text" id="message" name="message" />
            <button type="submit">Envoyer</button>
        </form>
    </div>
  );
}

export default FormContact;
