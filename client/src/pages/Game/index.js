import React, { Component } from 'react';
import "./game.css";

import API from "../../utils/API";

class Game extends Component {
  state = { 
    game:{}
   }

   componentDidMount(){
    this.getGame()
   }

   getGame = () => {
     API.getGameByID(this.props.gameSelectID)
      .then(result => {
        console.log(result.data);
        this.setState({game:result.data})
      })
      .catch(err => console.log(err))
   }

  render() { 
    return ( 
      <div>

      </div>
     );
  }
}
 
export default Game;