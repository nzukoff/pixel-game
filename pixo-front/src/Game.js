import React, { Component } from 'react';
import axios from 'axios';

class Game extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount(){
        this.doInitialFetch(this.props.host);
    }

    doInitialFetch(host) {
        axios
            .get(host)
            .then(response => console.log(response))
    }

    render() {
        return (
            <div className="Game">
                <p>Game component</p>
            </div>
        );
    }
}

export default Game;