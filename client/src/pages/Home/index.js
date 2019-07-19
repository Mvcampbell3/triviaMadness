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
        <p>There are going to be different categories of quizzes</p>
        <ul style={{ listStylePosition: "inside" }}>
          <li>History</li>
          <li>Science</li>
          <li>Movies and TV</li>
          <li>Music</li>
          <li>Other</li>
        </ul>
        <p>If we get enough 'Other' games with the same kind of category, we will add it to the selection list</p>
        <p>I am not sure what to do about images, we might just have one for each type of category</p>
        <p>We could also set up the background to have different ones based on category</p>
      </div>
    </div>
  );
}

export default Home;