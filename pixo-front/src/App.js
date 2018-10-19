import React, { Component } from 'react';
import Game from './Game'
import './App.css'


class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="container">
          {/* <Game host='https://pixel-game-api.herokuapp.com/'/> */}
          <Game host='http://127.0.0.1:5000/'/> 
          
        </div>
      </div>
    );
  }
}

export default App;
