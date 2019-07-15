import React from 'react';
import { Link } from "react-router-dom";
import "./header.css"
const Header = (props) => {
  return (
    <header>
      <h2>Trivia Madness</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            {props.user ? <button onClick={props.logoutUser}>Logout</button> : <Link to="/login">Login</Link>}
          </li>
          {props.user ? <li><Link to="/games">Games</Link></li> : null}
          {props.user ? <li><Link to="/creategame">Create Game</Link></li> : null}
        </ul>
      </nav>
    </header>
  );
}

export default Header;