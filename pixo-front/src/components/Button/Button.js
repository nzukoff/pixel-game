import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        console.log("BUTTON STYLE IS ", this.props.buttonStyle)
    }

    render() {
        return (
            <div className="Button">
                {/* this.props.chosen ? <button style={this.props.buttonStyle} ></button> : <button style={this.props.buttonStyle} onClick={() => this.props.chooseColor(this.props.place)}></button> */}
                <button style={this.props.buttonStyle} onClick={() => this.props.chooseColor(this.props.place)}></button>
            </div>
        );
    }
}

export default Button;