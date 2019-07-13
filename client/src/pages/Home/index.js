import React from 'react';
import { Link } from "react-router-dom"
import "./home.css"

const Home = (props) => {
  return (
    <div>
      <h1>This is the Home Page</h1>
      <Link to={props.user ? "/games":"/login"}>{props.user ? "Games":"Login"}</Link>
    </div>
  );
}

export default Home;