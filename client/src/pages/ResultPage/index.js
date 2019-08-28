import React from 'react';
import { Link } from "react-router-dom";
import "./resultPage.css";

import Header from "../../components/Header"

const ResultPage = (props) => {
  const { graded, score, username, questions, rightWrongArr } = props.gameResult;
  return (
    <div className="container">
      {props.resultToHome()}
      {props.scrollTopPage()}
      <Header user={props.user} logoutUser={props.logoutUser} />
      <div className="wrapper">
        {props.gameResult.username ?
          <div className="resultBox">
            <h3 className="text-center main-title">{username}, you got {score}!</h3>
            <h3 className="text-center main-title">Quiz Name: {props.title}</h3>
            <Link className="linkBack text-center" to="/">Back</Link>
            <div className="answerArea">
              <h3 className="lightColor">Answers:</h3>
              {console.log(props.gameResult)}
              {graded.map((grade, i) =>
                <div className="questionList" key={i}>
                  <h3>{questions[i].question}</h3>
                  <h4 className={rightWrongArr[i] ? "rightHighlight" : "wrongHighlight"}
                    key={i}>Correct Answer: <span className="rightUserAnswer userAnswer">{grade.correct}</span>, Your Answer: <span className={rightWrongArr[i] ? "rightUserAnswer userAnswer" : "wrongUserAnswer userAnswer"}>{grade.userAnswer}</span></h4>
                </div>
              )}
            </div>

            <Link className="linkBack text-center" to="/">Back</Link>

          </div>
          : null}
      </div>
    </div>
  );
}

export default ResultPage;