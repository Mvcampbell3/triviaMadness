import React from 'react';
import "./home.css"
import Header from "../../components/Header"

const Home = (props) => {
  return (
    <div className="container">
      <Header user={props.user} logoutUser={props.logoutUser} />
      <div className="wrapper">
        {props.resetSendHome()}
        <h1>This is the Home page</h1>
        <p className="content">We will be adding in all of the most important stuff very soon</p>
      </div>
    </div>
  );
}

export default Home;