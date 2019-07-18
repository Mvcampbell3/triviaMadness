import React, { Component } from 'react';
import { Redirect } from "react-router-dom"
import "./createGame.css";
import API from '../../utils/API';

class CreateGame extends Component {
  state = {
    title: "",
    category: "",
    gameObj: {}
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

    const newQuestion = document.createElement("div");
    newQuestion.className = "newQuestion"
    newQuestion.dataset.question = "empty";
    newQuestion.dataset.answer0 = "empty";
    newQuestion.dataset.answer1 = "empty";
    newQuestion.dataset.answer2 = "empty";
    newQuestion.dataset.answer3 = "empty";
    newQuestion.dataset.correct = "empty";

    const delBtn = document.createElement("button");
    delBtn.className = "delBtn";
    delBtn.addEventListener("click", function() {
      console.log(this.parentElement);
      this.parentElement.className = "deleteQuestion";
    })
    delBtn.textContent = "X";

    const question = document.createElement("input");
    question.type = "text";
    question.name = "question";
    question.autocomplete = "off"
    question.className = "topInput questionInput"
    question.placeholder = `Question`
    question.dataset.holder = "question"
    question.addEventListener("keyup", function() {
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
      button.className = "answerButton";
      button.textContent = "O"
      button.dataset.holder = `answer${i}`
      button.addEventListener("click", function() {
        console.log(this.parentElement.parentElement.parentElement.dataset.correct)
        this.parentElement.parentElement.parentElement.dataset.correct =
          this.parentElement.parentElement.parentElement.dataset[this.dataset.holder]
        answerButtons.forEach(one => {
          one.className = "answerButton";
          one.textContent = "O"
        });
        this.classList = "answerButton clicked"
        this.textContent = "X"
      })
    })

    answerInputs.forEach((one, i) => {
      one.type = "text";
      one.placeholder = `Answer ${i + 1}`;
      one.classList = `answer`;
      one.autocomplete = "off";
      one.dataset.holder = `answer${i}`
      one.addEventListener("keyup", function() {
        const holder = this.dataset.holder;
        const datasets = this.parentElement.parentElement.parentElement.dataset[holder] = this.value;
        console.log(datasets)
        answerButtons.forEach(one => {
          one.className = "answerButton";
          one.textContent = "O"
        })
      })
    })

    answer1.append(answer1Button, answer1Input);
    answer2.append(answer2Button, answer2Input);
    answer3.append(answer3Button, answer3Input);
    answer4.append(answer4Button, answer4Input);

    answerBox.append(answer1, answer2, answer3, answer4)
    newQuestion.append(delBtn, question, answerBox);
    questionCreateArea.append(newQuestion);
  }

  grabQuiz = () => {
    let gameQuestions = [];
    let correctAnswers = [];
    const allQuestions = [].slice.call(document.querySelectorAll(".newQuestion"));
    allQuestions.forEach((question, i) => {
      gameQuestions.push({
        question: question.dataset.question,
        answers: [question.dataset.answer0, question.dataset.answer1, question.dataset.answer2, question.dataset.answer3],
      })
      correctAnswers.push(question.dataset.correct)
    })

    console.log(gameQuestions)
    console.log(correctAnswers);

    const sendObj = {
      title: this.state.title,
      category: this.state.category,
      questions: gameQuestions,
      correct: correctAnswers
    }

    console.log(sendObj)
    this.setState(prevState => {
      prevState.gameObj = sendObj;
      return prevState;
    }, () => {
      console.log("prevstate callback");
      this.sumbitGame();
    })
  }

  sumbitGame = () => {
    API.createNewGame(this.state.gameObj)
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
        <h1 className="text-center">Game Create</h1>
        <h4 className="text-center">Enter in the informaiton you want to make your game about</h4>
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
        <div id="questionCreateArea"></div>
        <button className="addQBtn" onClick={this.addQuestion}>Add Question</button>
        <button className="submitBtn" onClick={this.grabQuiz}>Submit Quiz</button>
      </div>
    );
  }
}

export default CreateGame;