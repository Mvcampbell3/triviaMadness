import React from 'react';
import "./login.css"

import Header from "../../components/Header";

const Login = (props) => {
  return (
    <div className="loginBox container">
      <Header user={props.user} logoutUser={props.logoutUser} />
      {props.renderRedirect()}
      <div className="wrapper formWrap">
        <h2 className="text-center">{props.signup ? "Signup" : "Login"}</h2>
        <div className="loginForm">
          <div className="loginGroup">
            <label>Email</label>
            <input className="inputText" type="email" name="email" autoComplete="off" onChange={e => props.handleInputChange(e)} value={props.email} />
          </div>
          {props.signup ? <div id="usernameInput" className={props.showSignup ? "loginGroup fadeIn" : "loginGroup fadeOut"}>
            <label>Username</label>
            <input className="inputText" type="text" name="username" autoComplete="off" onChange={e => props.handleInputChange(e)} value={props.username} />
          </div> : null}

          <div className="loginGroup">
            <label>Password</label>
            <input className="inputText" type="password" name="password" autoComplete="off" onChange={e => props.handleInputChange(e)} value={props.password} />
          </div>
        </div>
        <div className={props.failedLogin ? "downTown" : "downTownOut"}>Incorrect Email or Password</div>
        {props.justSigned ? <div className="downTown">You're signed up! Just login to enter!</div> : null}
        <div className="loginButtons">
          <button className="formBtn" onClick={props.signup ? props.signupUser : props.loginUser}>{props.signup ? "Signup" : "Login"}</button>
          {props.justSigned ? null : <button className="switchSignup" onClick={props.switchSignup}>{props.signup ? "Already a member?" : "Not a member yet?"}</button>}

        </div>
      </div>
    </div>
  );
}

export default Login;