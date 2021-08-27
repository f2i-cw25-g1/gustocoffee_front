import FormInscriptionConnexion from "../components/FormInscriptionConnexion"
import { useState } from 'react';

const InscriptionConnexion = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthMode = () => {
    setIsLogin((prevState) => !prevState);
  };


  return (
    <main>
      <p className="subsection_title">{isLogin ? "Connexion" : "Inscription"}</p>
      <FormInscriptionConnexion switchAuthMode={switchAuthMode} isLogin={isLogin} />
    </main>
  );
}

export default InscriptionConnexion;
