import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    componentDidMount() {
        this.setState((prevState, props) => ({
            styles : {
                backgroundColor: `rgb(${this.props.color_option})`, 
                padding: '16px 16px'
            }
        }))    
    }
    
    render() {
        return (
            <div className="Button">
                {
                    this.props.chosen ? <div></div> : <button style={this.state.styles} className={`button${this.props.index}`} onClick={() => this.props.chooseColor(this.props.index)}></button>
                }
            </div>
        );
    }
}

export default Button;