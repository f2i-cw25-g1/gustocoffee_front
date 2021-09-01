import React, { useEffect } from 'react';
import './css/Recaptcha.css';

function Recaptcha() {
    const handleLoaded = _ => {
        window.grecaptcha.ready(_ => {
            window.grecaptcha
            .execute("6LdLsTocAAAAAE2z_0XiXOSFXkVIX6mTvx_h2Cfv", { action: "homepage" })
            .then(token => {
                // ...
            })
        })
    }
    
    useEffect(() => {
    // Add reCaptcha
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