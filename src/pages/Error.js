import {Link} from 'react-router-dom';

//page appelée lorsqu'on veut atteindre une page qui n'existe pas
function Error() {
  return (
    <main>
      <p className="subsection_title">Erreur 404</p>
      <div className="center">
        <Link className="sub_button2" to='/'>Retourner à l'accueil</Link>
      </div>
    </main>
  );
}
  
export default Error;
