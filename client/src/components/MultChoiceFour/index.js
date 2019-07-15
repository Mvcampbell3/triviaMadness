import React from 'react';

import "./multChoiceFour.css";

const MultChoiceFour = (props) => {
  return ( 
    <div className="questionGroup">
      <div className="questionBlock">
        <label htmlFor="question">Question</label>
        <input type="text" name="question" placeholder="Question..." />
      </div>
      <div className="answerBlock">
        <div className="answerGroup">
          <label>Answer</label>
          <input type="text"/>
          <button>Set as Correct</button>
        </div>
        <div className="answerGroup">
          <label>Answer</label>
          <input type="text"/>
          <button>Set as Correct</button>
        </div>
        <div className="answerGroup">
          <label>Answer</label>
          <input type="text"/>
          <button>Set as Correct</button>
        </div>
        <div className="answerGroup">
          <label>Answer</label>
          <input type="text"/>
          <button>Set as Correct</button>
        </div>
      </div>
    </div>
   );
}
 
export default MultChoiceFour;