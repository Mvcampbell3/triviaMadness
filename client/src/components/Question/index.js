import React from 'react';
import "./question.css"

const Question = (props) => {
  return (
    <div className={props.styleList ? "questionList" : "questionBlock"}>
      <h3 className="questionQ">{props.iQues + 1}. {props.question}</h3>
      <div className={props.styleList ? "answerList" : "answerBlock"}>
        {props.answers.map((answer, indexAnswers) =>
          <button
            key={indexAnswers}
            className={`answerBtn forQuestion${props.iQues}`}
            onClick={e => props.handleAnswer(e)}
            data-which={props.iQues}
            data-answer={answer}
          >
            {answer}
          </button>
        )}
      </div>
    </div>
  )
}

export default Question;