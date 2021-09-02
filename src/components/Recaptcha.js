import React, { useEffect } from 'react';
import './css/Recaptcha.css';

//Captcha appelé sur chaque page (présent dans App.js)
function Recaptcha() {
    //ajoute la clé de site
    const handleLoaded = _ => {
        window.grecaptcha.ready(_ => {
            window.grecaptcha
            .execute("6LdLsTocAAAAAE2z_0XiXOSFXkVIX6mTvx_h2Cfv", { action: "homepage" })
            .then(token => {
                // ...
            })
        })
    }
    
    //ajoute le captcha
    useEffect(() => {
        const script = document.createElement("script")
        script.src = "https://www.google.com/recaptcha/api.js?render=6LdLsTocAAAAAE2z_0XiXOSFXkVIX6mTvx_h2Cfv"
        script.addEventListener("load", handleLoaded)
        document.body.appendChild(script)
    }, [])

    return (
    <div
        className="g-recaptcha"
        data-sitekey="6LdLsTocAAAAAE2z_0XiXOSFXkVIX6mTvx_h2Cfv_"
        data-size="invisible"
    ></div>
    );
}

export default Recaptcha;