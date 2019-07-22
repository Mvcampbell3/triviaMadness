import React from 'react';
import "./resultPage.css";

import Header from "../../components/Header"

const ResultPage = (props) => {
  const { right, wrong, graded, score, username } = props.gameResult;
  return (
    <div className="container">
      {props.resultToHome()}
      <Header user={props.user} logoutUser={props.logoutUser} />
      <div className="wrapper">
        {props.gameResult.username ?
          <div className="check">
            <h1>Result Page</h1>
            {console.log(props.gameResult)}
            <h3>{right}</h3>
            <h3>{wrong}</h3>
            {graded.map((grade, i) => <h3 key={i}>{grade.correct}: {grade.userAnswer}</h3>)}
            <h3>{score}</h3>
            <h3>{username}</h3>
            <h3>{props.title}</h3>
          </div>
          : null}
      </div>
    </div>
  );
}

export default ResultPage;