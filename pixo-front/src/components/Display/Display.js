import React, { Component } from 'react';
import ScoreBar from '../ScoreBar/ScoreBar'
import './Display.css'

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
                <div className="score_board">
                    <div className="container">
                        <div className="row">                            
                            <div className="col">
                                <button type="button" className="btn btn-secondary" onClick={() => {this.props.reset(5)}}>Easy</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-secondary" onClick={() => {this.props.reset(10)}}>Medium</button>
                            </div>
                            <div className="col">
                                <button type="button" className="btn btn-secondary" onClick={() => {this.props.reset(15)}}>Hard</button>
                            </div>                       
                        </div>
                        <div className="row">
                            <div className="col">
                                <h1 className="score display-4">{`Score: ${this.props.score}`}</h1>
                                {
                                    this.props.chosenPlace ? <h3 className="score">{`Your guess was ${this.props.chosenPlace}${end} place`}</h3> : <div></div>
                                }
                                <ScoreBar percentage={this.props.percentage} />                        
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Button;