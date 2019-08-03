import React from 'react';
import "./resultPage.css";

import Header from "../../components/Header"

const ResultPage = (props) => {
  const { graded, score, username, questions, rightWrongArr } = props.gameResult;
  return (
    <div className="container">
      {props.resultToHome()}
      <Header user={props.user} logoutUser={props.logoutUser} />
      <div className="wrapper">
        {props.gameResult.username ?
          <div className="check">
            <h3>You got {score}!</h3>

            {console.log(props.gameResult)}
            {graded.map((grade, i) =>
              <div className="questionList" key={i}>
                <h3>{questions[i].question}</h3>
                <h4 className={rightWrongArr[i] ? "rightHighlight" : "wrongHighlight"}
                  key={i}>Correct Answer: <span className="rightUserAnswer userAnswer">{grade.correct}</span>, Your Answer: <span className={rightWrongArr[i] ? "rightUserAnswer userAnswer" : "wrongUserAnswer userAnswer"}>{grade.userAnswer}</span></h4>
              </div>
            )}
            <h3>{username}</h3>
            <h3>{props.title}</h3>
          </div>
          : null}
      </div>
    </div>
  );
}

export default ResultPage;