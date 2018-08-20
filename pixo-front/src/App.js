import React, { Component } from 'react';
import Game from './Game'

class App extends Component {

  render() {
    return (
      <div className="App">
        <Game host='http://127.0.0.1:5000/'/>
      </div>
    );
  }
}

export default App;
