import React from 'react';

const Login = (props) => {
  return (
    <div className="loginBox">
      {props.renderRedirect()}
      <div className="loginForm">
        <div className="loginGroup">
          <label>Email</label>
          <input type="email" name="email" autoComplete="off" onChange={e => props.handleInputChange(e)} value={props.email} />
        </div>
        {/* Need to hide username input group on login */}
        <div className="loginGroup">
          <label>Username</label>
          <input type="text" name="username" autoComplete="off" onChange={e => props.handleInputChange(e)} value={props.username} />
        </div>
        <div className="loginGroup">
          <label>Password</label>
          <input type="password" name="password" autoComplete="off" onChange={e => props.handleInputChange(e)} value={props.password} />
        </div>
      </div>
      <div className="loginButtons">
        <button onClick={props.signup ? props.signupUser : props.loginUser}>{props.signup ? "Signup" : "Login"}</button>
        <button className="switchSignup" onClick={props.switchSignup}>{props.signup ? "Already a member?" : "Not a member yet?"}</button>
      </div>
    </div>
  );
}

export default Login;