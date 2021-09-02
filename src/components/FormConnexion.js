//appelé par component forminscriptionconnexion, non fonctionnel, en cours mais innachevé par manque de temps
function FormConnexion(){
    const loginUser = async (event)=>{

    }
    return(
        <div>
            <p className="subsection_title">Connexion</p>
            <form onSubmit={loginUser}>
                <label htmlFor="adresse_mail">Adresse Email</label>
                <input type="mail" id="mail" name="mail" />

                <label htmlFor="mot_de_passe">Mot de passe</label>
                <input type="password" id="mot_de_passe" name="mot_de_passe" />

                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default FormConnexion;