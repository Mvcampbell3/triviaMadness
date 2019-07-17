import React from 'react';
import "./home.css"

const Home = (props) => {
  return (
    <div className="container">
      {props.resetSendHome()}
      <h1>This is the Home Page</h1>
      <h4>Welcome to trivia madness</h4>
      <p>This site is for people who love to play and create trivia games!</p>
    </div>
  );
}

export default Home;