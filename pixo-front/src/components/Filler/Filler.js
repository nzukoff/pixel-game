import React, { Component } from 'react';
import './Filler.css'

class Filler extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="Filler" style={{ width: `${this.props.percentage}%` }} >
            </div>
        );
    }
}

export default Filler;