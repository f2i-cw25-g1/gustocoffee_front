
function FormConnexion(){
    const loginUser = async (event)=>{

    }
    return(
        <form onSubmit={loginUser}>
            <label htmlFor="adresse_mail">Adresse Email</label>
            <input type="mail" id="mail" name="mail" />

            <label htmlFor="mot_de_passe">Mot de passe</label>
            <input type="password" id="mot_de_passe" name="mot_de_passe" />

            <button type="submit">Se connecter</button>
        </form>
    );
}

export default FormConnexion;