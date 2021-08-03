import Form from "../components/FormContact";

function Contact() {
  return (
    <main>
      <p className="subsection_title">Contact</p>
      <Form />
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2623.861536334096!2d2.3518551162269454!3d48.87991607928958!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66e6c471f6e59%3A0xd1f32f9827f1c66a!2s25%20Rue%20de%20Dunkerque%2C%2075010%20Paris!5e0!3m2!1sfr!2sfr!4v1627895142100!5m2!1sfr!2sfr" className="map" allowfullscreen="" loading="lazy"></iframe>
      <a href="https://www.instagram.com/gustocoffee75/?hl=fr" target="_blank">Instagram</a>
    </main>
  );
}

export default Contact;
