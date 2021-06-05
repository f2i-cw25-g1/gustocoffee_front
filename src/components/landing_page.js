import React from "react";

class LandingPage extends React.Component {
  render() {
    return (
      <div className="landing">
        <div className="catch_phrase">
          <h1 className="title">Gusto Coffee</h1>
          <h2 className="subtitle">Votre espace de coworking</h2>
        </div>
        <a href="#" className="main_button">
          Réserver
        </a>
      </div>
    );
  }
}

export default LandingPage;
