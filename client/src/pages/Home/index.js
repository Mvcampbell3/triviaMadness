import React from 'react';
import "./home.css";
import Header from "../../components/Header";
import PictureMeme from "../../images/jumpWaterMeme.jpg";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";

const Home = (props) => {
  return (
    <div>
      {props.checkedAuth ?
        <div>
          {props.user ?
            <div className="container">
              <Header user={props.user} logoutUser={props.logoutUser} />
              <div className="return">
                <h4>Welcome Back {props.username}!</h4>
                <div className="holderPlaces">
                  <Link to="/creategame" className="boxPlace" id="boxMove">Create</Link>
                  <Link to="/games" className="boxPlace" id="boxMove2">Play</Link>
                  <div className="boxPlace" id="boxMove3">Trivia</div>
                </div>
              </div>
              {/* Place for logged in users */}
            </div> :
            <div className="container">
              {/* Place for not logged in users */}
              {props.resetSendHome()}
              <Header user={props.user} logoutUser={props.logoutUser} />
              <h1 className="homeTitle text-center">Welcome to Trivia Madness!</h1>
              <div className="wrapperHome">
                <div className="end"></div>
                <div className="middle">
                  <img src={PictureMeme} alt="meme" className="homePic" />
                  <p className="homeContent">This is the place to be if you love both playing trivia games and creating trivia games of your own. Our main goal here at Trivia Madness is to create a place where people can come together and play trivia that was created by other users. Members can play all of the the user generated games and create some of their own for free! Along with user generated games, we will constantly be adding games of our own. We will also keep track of how you do in the games so that you can check your scores anytime you want.</p>
                </div>
                <div className="end"></div>
              </div>
              {/* Outside of Grid */}
              <h3 className="margin-top text-center">What are you waiting for?</h3>
              <h3 className="text-center">Login or Sign up so you can get out there and trivia to the max!</h3>
            </div>}
        </div>
        : <Loader />}
    </div>
  );
}

export default Home;