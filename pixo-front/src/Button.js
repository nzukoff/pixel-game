import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props)
    }
    
    render() {
        return (
            <div className="Button">
                {
                    <button style={this.props.buttonStyle} onClick={() => this.props.chooseColor(this.props.place)}></button>
                }
            </div>
        );
    }
}

export default Button;