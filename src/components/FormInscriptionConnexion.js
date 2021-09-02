import FormInscription from "./FormInscription";
import FormConnexion from "./FormConnexion";
//appelé par page inscriptionConnexion
function FormInscriptionConnexion(){
    return(
    <div className="flexform">
        <FormInscription/>
        <FormConnexion/>
    </div>
    );
}

export default FormInscriptionConnexion;