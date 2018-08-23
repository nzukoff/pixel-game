import React, { Component } from 'react';
import Game from './Game'
import './Button.css'

class App extends Component {

  render() {
    return (
      <div className="App">
        <div className="container">
          <Game host='http://127.0.0.1:5000/'/>
        </div>
        
      </div>
    );
  }
}

export default App;
