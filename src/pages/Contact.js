import Form from "../components/FormContact";

function Contact() {
  return (
    <main>
      <p className="subsection_title">Contact</p>
      <Form />
      <div className="contact_infos">
        <p>Journées d'ouverture : 7 jours sur 7</p>
        <p>Horaires d'ouverture : de 7h à 22h</p>
        <p>Adresse : 25 Rue de Dunkerke</p>
        <p>Numéro de téléphone : <a className="tellink" href="tel:0165389423">01.65.38.94.23</a></p>
      </div>
    </main>
  );
}

export default Contact;
