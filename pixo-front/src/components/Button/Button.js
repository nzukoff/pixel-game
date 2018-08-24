import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        let buttonStyle
        let currentBackground = this.props.buttonStyle.backgroundColor
        if (currentBackground == 'rgb(236,249,249)' || currentBackground == 'rgb()') {
            buttonStyle = {
                ...this.props.buttonStyle,
                border: 'none',
                margin: '2px',
            }
        }
        else {
            buttonStyle = this.props.buttonStyle
        }
        return (
            <div className="Button">
                <div style={buttonStyle} onClick={() => this.props.chooseColor(this.props.place)}></div>
            </div>
        );
    }
}

export default Button;