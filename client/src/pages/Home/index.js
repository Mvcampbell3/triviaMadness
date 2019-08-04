import React from 'react';
import "./home.css";
import Header from "../../components/Header";
import PictureMeme from "../../images/jumpWaterMeme.jpg";
import Loader from "../../components/Loader";

const Home = (props) => {
  return (
    <div>
      {props.checkedAuth ?
        <div>
          {props.user ?
            <div>
              <Header user={props.user} logoutUser={props.logoutUser} />

              {/* Place for logged in users */}
              Welcome Back {props.username}!
            </div> :
            <div className="containerHome">
              {/* Place for not logged in users */}
              <Header user={props.user} logoutUser={props.logoutUser} />

              <p className="homeTitle text-center">Welcome to Trivia Madness!</p>
              <div className="wrapperHome">
                {props.resetSendHome()}
                <div className="textHome">
                  <p className="homeContent">This is the place to be if you love both playing trivia games and creating trivia games of your own.Our main goal here at Trivia Madness is to create a place where people can come together and play trivia that was created by other users. Members can play all of the the user generated games and create some of their own for free! Along with user generated games, we will constantly be adding games of our own. We will also keep track of how you do in the games so that you can check your scores anytime you want.</p>
                </div>
                <img src={PictureMeme} alt="meme" className="homePic" />
              </div>
              {/* Outside of Grid */}
              <p className="margin-top text-center">What are you waiting for?</p>
              <p className="text-center">Login or Sign up so you can get out there and trivia to the max!</p>
            </div>}
        </div>
        : <Loader />}
    </div>
  );
}

export default Home;