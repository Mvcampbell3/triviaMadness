import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import "./createGame.css";
import MultChoiceFour from "../../components/MultChoiceFour";

class CreateGame extends Component {
  state = {
    numberOfQuestions: 0,
    questions: [],
    correct: []
  }

  sendToLogin = () => {
    if (this.props.user === false) {
      return <Redirect to="/login" />
    } else {
      return
    }
  }

  addQuestion = () => {
    const questionCreateArea = document.getElementById("questionCreateArea");
    const noQs = this.state.numberOfQuestions;

    const newQuestion = document.createElement("div");
    const question = document.createElement("input");
    const questionLabel = document.createElement("label");
    questionLabel.textContent = `Question ${noQs + 1}`
    question.type = "text";
    question.name = "question";
    question.dataset.which_question = noQs;
    question.id = `question${noQs}`

    const answerBox = document.createElement("div");
    answerBox.className = "answerBox";
    const answer1 = document.createElement("input");
    const answer2 = document.createElement("input");
    const answer3 = document.createElement("input");
    const answer4 = document.createElement("input");
    const answers = [answer1, answer2, answer3, answer4];

    answers.forEach((one,i) => {
      one.type = "text";
      one.placeholder = `Answer ${i + 1}`
      one.classList = `answer forQuestion${noQs}`
      one.id = `answer${i}question${noQs}`
    })
    
    const correctAnswer = document.createElement("input");
    correctAnswer.className = "correctAnswer"
    correctAnswer.placeholder = "Correct Answer";
    correctAnswer.id = `correctAnswer${noQs}`
    correctAnswer.dataset.which_answer = noQs

    answerBox.append(answer1, answer2, answer3, answer4, correctAnswer)
    newQuestion.append(questionLabel, question, answerBox);
    questionCreateArea.append(newQuestion);

    console.log(noQs);
    this.setState({ numberOfQuestions: this.state.numberOfQuestions + 1 })
  }

  grabQuiz = () => {
    const noQs = this.state.numberOfQuestions;
    let gameQuestions = [];
    let correctAnswers = [];
    for (let i = 0; i < noQs; i++){
      gameQuestions[i] = {
        question: document.getElementById(`question${i}`).value,
        answers: [
          document.getElementById(`answer0question${i}`).value,
          document.getElementById(`answer1question${i}`).value,
          document.getElementById(`answer2question${i}`).value,
          document.getElementById(`answer3question${i}`).value,
        ]
      };
      correctAnswers[i] = document.getElementById(`correctAnswer${i}`).value;
    }
    console.log(gameQuestions);
    console.log(correctAnswers)

  }

  render() {
    return (
      <div>
        {this.sendToLogin()}
        <h1>This is the create game screen</h1>
        <button onClick={this.addQuestion}>Add Question</button>
        <div id="questionCreateArea"></div>
        <button onClick={this.grabQuiz}>Sub</button>
      </div>
    );
  }
}

export default CreateGame;