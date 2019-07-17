import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import "./createGame.css";
import API from '../../utils/API';

class CreateGame extends Component {
  state = {
    numberOfQuestions: 0,
    questions: [],
    correct: [],
    title: "",
    category: ""
  }

  sendToLogin = () => {
    if (this.props.user === false) {
      return <Redirect to="/login" />
    } else {
      return
    }
  }

  addQuestion = () => {
    // Need to add in ways to remove questions that have been added;
    // Add button to new question div
    // give button value of noQs when created

    // Might need to rethink how we are doing this whole thing
    // Look into accessing the siblings in a div to tranfer information?

    const questionCreateArea = document.getElementById("questionCreateArea");
    const noQs = this.state.numberOfQuestions;

    const newQuestion = document.createElement("div");
    newQuestion.className = "newQuestion"
    newQuestion.dataset.question = "empty";
    newQuestion.dataset.answer0 = "empty";
    newQuestion.dataset.answer1 = "empty";
    newQuestion.dataset.answer2 = "empty";
    newQuestion.dataset.answer3 = "empty";
    newQuestion.dataset.correct = "empty";
    const question = document.createElement("input");
    question.type = "text";
    question.name = "question";
    question.autocomplete = "off"
    question.className = "topInput questionInput"
    question.dataset.which_question = noQs;
    question.placeholder = `Question ${noQs + 1}`
    question.id = `question${noQs}`
    question.dataset.holder = "question"
    question.addEventListener("keyup", function(){
      console.log(this.parentElement)
      this.parentElement.dataset.question = this.value
    })

    const answerBox = document.createElement("div");
    answerBox.className = "answerBox";
    const answer1Input = document.createElement("input");
    const answer2Input = document.createElement("input");
    const answer3Input = document.createElement("input");
    const answer4Input = document.createElement("input");
    const answer1Button = document.createElement("button");
    const answer2Button = document.createElement("button");
    const answer3Button = document.createElement("button");
    const answer4Button = document.createElement("button");

    const answer1 = document.createElement("div");
    const answer2 = document.createElement("div");
    const answer3 = document.createElement("div");
    const answer4 = document.createElement("div");

    const answerButtons = [answer1Button, answer2Button, answer3Button, answer4Button];
    const answerInputs = [answer1Input, answer2Input, answer3Input, answer4Input];

    answerButtons.forEach((button, i) => {
      button.className = "answerbutton";
      button.textContent = "X"
      button.dataset.which_answer = `answer${i}question${noQs}`;
      button.dataset.holder = `answer${i}`
      button.addEventListener("click", function() {
        console.log(this.parentElement.parentElement.parentElement.dataset.correct)
        this.parentElement.parentElement.parentElement.dataset.correct =
        this.parentElement.parentElement.parentElement.dataset[this.dataset.holder]
        // Add classnames to differentiate clicked/unclicked
      })
    })

    answerInputs.forEach((one, i) => {
      one.type = "text";
      one.placeholder = `Answer ${i + 1}`;
      one.classList = `answer forQuestion${noQs}`;
      one.id = `answer${i}question${noQs}`;
      one.autocomplete = "off";
      one.dataset.correct_answer = "false";
      one.dataset.holder = `answer${i}`
      one.addEventListener("keyup", function() {
        const holder = this.dataset.holder;
        const datasets = this.parentElement.parentElement.parentElement.dataset[holder] = this.value;
        console.log(datasets)
        // Remove clicked class from buttons, the dataset needs to be updated
      })
    })

    answer1.append(answer1Button, answer1Input);
    answer2.append(answer2Button, answer2Input);
    answer3.append(answer3Button, answer3Input);
    answer4.append(answer4Button, answer4Input);

    answerBox.append(answer1, answer2, answer3, answer4)
    newQuestion.append(question, answerBox);
    questionCreateArea.append(newQuestion);

    console.log(noQs);
    this.setState({ numberOfQuestions: this.state.numberOfQuestions + 1 })
  }

  grabQuiz = () => {
    const noQs = this.state.numberOfQuestions;
    let gameQuestions = [];
    let correctAnswers = [];
    const findAnswers = [].slice.call(document.querySelectorAll(".answer"))
    const totalRight = findAnswers.filter(answer => answer.dataset.correct_answer === "true");
    console.log(totalRight.length);

    if (totalRight.lenth < noQs) {
      return alert("have not marked all the correct answers in the questions")
    }

    for (let i = 0; i < noQs; i++) {

      const answers = [].slice.call(document.querySelectorAll(".forQuestion" + i));
      const rightAnswer = answers.filter(eachAnswer => eachAnswer.dataset.correct_answer === "true");
      if (rightAnswer.length === 0) {
        return alert(`Question ${i + 1} is missing a correct answer`)
      }
      console.log(rightAnswer)
      gameQuestions[i] = {
        question: document.getElementById(`question${i}`).value,
        answers: [
          document.getElementById(`answer0question${i}`).value,
          document.getElementById(`answer1question${i}`).value,
          document.getElementById(`answer2question${i}`).value,
          document.getElementById(`answer3question${i}`).value,
        ]
      };
      correctAnswers[i] = rightAnswer[0].value;
    }
    console.log(gameQuestions);
    console.log(correctAnswers)
    this.setState((prevState) => {
      prevState.questions = gameQuestions;
      prevState.correct = correctAnswers;
      return prevState;
    }, () => {
      console.log("This is in the callback for set state");
      // this.sumbitGame();
    })
    // This all needs to be reset

  }

  sumbitGame = () => {
    API.createNewGame(this.state.title, this.state.category, this.state.questions, this.state.correct)
      .then(result => {
        console.log(result)
      })
      .catch(err => {
        console.log(err)
      })
  }

  changeSelect = () => {
    console.log("onChange")
    this.setState({ category: document.getElementById("category").value })
  }

  handleInput = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  render() {
    return (
      <div className="container">
        {this.sendToLogin()}
        <h1>Game Create</h1>
        <h4>Enter in the informaiton you want to make your game about</h4>
        <div className="inputGroup">
          <label>Title of the Quiz</label>
          <input
            value={this.state.title}
            type="text"
            name="title"
            placeholder="Quiz Title..."
            onChange={e => this.handleInput(e)}
            autoComplete="off"
            className="topInput"
          />
        </div>
        <div className="inputGroup">
          <label>Category of the Quiz</label>
          <select id="category" onChange={this.changeSelect}>
            <option value="did not select">Pick Category:</option>
            <option value="History">History</option>
            <option value="Movies and TV">Movies and TV</option>
            <option value="Science">Science</option>
            <option value="Music">Music</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <hr />
        <button className="addQBtn" onClick={this.addQuestion}>Add Question</button>
        <div id="questionCreateArea"></div>
        <button className="submitBtn" onClick={this.grabQuiz}>Submit Quiz</button>
      </div>
    );
  }
}

export default CreateGame;