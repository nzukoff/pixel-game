import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props)
    }

    componentDidUpdate() {
        console.log("BUTTON STYLE IS ", this.props.buttonStyle.backgroundColor)
    }

    render() {
        return (
            <div className="Button">
                {/* this.props.chosen ? <button style={this.props.buttonStyle} ></button> : <button style={this.props.buttonStyle} onClick={() => this.props.chooseColor(this.props.place)}></button> */}
                <button style={this.props.buttonStyle} onClick={() => this.props.chooseColor(this.props.place)}></button>
                {/* {
                    this.props.buttonStyle.backgroundColor == 'rgb(236,249,249)' ?
                    <div style={this.props.buttonStyle}>X</div> :
                    <button class="empty" type="button" style={this.props.buttonStyle} onClick={() => this.props.chooseColor(this.props.place)}></button>
                } */}
            </div>
        );
    }
}

export default Button;