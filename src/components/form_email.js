import React from "react";

class FormEmail extends React.Component {
  render() {
    return (
      <form action>
        <input placeholder="Votre Mail" type="email" />
        <button>S'inscrire</button>
      </form>
    );
  }
}

export default FormEmail;
