import React from 'react';
import "./question.css"

const Question = (props) => {
  return (
    <div className="questionBlock">
      <h3 className="questionQ">{props.iQues + 1}. {props.question}</h3>
      <div className="answerBlock">
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