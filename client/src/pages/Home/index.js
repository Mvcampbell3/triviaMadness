import React from 'react';
import "./home.css"
import Header from "../../components/Header"

const Home = (props) => {
  return (
    <div className="container">
      <Header user={props.user} logoutUser={props.logoutUser} />
      <div className="wrapper">
        {props.resetSendHome()}
        <h1>This is the Home Page</h1>
        <h4>Welcome to trivia madness</h4>
        <p>This site is for people who love to play and create trivia games!</p>
      </div>
    </div>
  );
}

export default Home;