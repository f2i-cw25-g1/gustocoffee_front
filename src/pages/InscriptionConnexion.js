import FormInscriptionConnexion from "../components/FormInscriptionConnexion"
import { useState } from 'react';

const InscriptionConnexion = () => {

  const [isSelectLogin, setIsSelectLogin] = useState(true);

  const switchAuthMode = () => {
    setIsSelectLogin((prevState) => !prevState);
  };

  return (
    <>
      <main>
        <p className="subsection_title">{isSelectLogin ? "Connexion" : "Inscription"}</p>
        <FormInscriptionConnexion switchAuthMode={switchAuthMode} isSelectLogin={isSelectLogin} />
      </main>
    </>
  );
}

export default InscriptionConnexion;
