import React, { Component } from 'react';

class Button extends Component {
    constructor(props) {
        super(props)
    }

    findEnding = () => {
        let end = ''
        if (this.props.chosenPlace == 1) {
            end = 'st'
        } else if (this.props.chosenPlace == 2) {
            end = 'nd'
        } else if (this.props.chosenPlace == 3) {
            end = 'rd'
        } else {
            end = 'th'
        }
        return end
    }

    render() {
        let end = this.findEnding()
        return (
            <div className="Display">
                {
                    this.props.chosenPlace ? <h3>{`Your guess was ${this.props.chosenPlace}${end} place`}</h3> : <div></div>
                }
            </div>
        );
    }
}

export default Button;