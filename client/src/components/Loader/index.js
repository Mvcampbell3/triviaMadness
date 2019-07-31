import React from 'react';
import "./loader.css";

const Loader = (props) => {
  return (
    <div className="loader">
      <div className="spinner">
        <p className="spinnerText">Loading</p>
      </div>
    </div>

  );
}

export default Loader;