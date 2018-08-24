import React, { Component } from 'react';
import axios from 'axios';
import Image from './Image'
import Button from './Button'
import Display from './Display'

class Game extends Component {
    constructor(props) {
        super(props)
        this.state={
            color_options : [],
            pixels : [],
            image_size : [], 
            button_styles : [],
            score : 0, 
            chosen_place : 0
        }
    }

    componentDidMount() {
        this.doInitialFetch(this.props.host)
    }

    doInitialFetch = (host = this.props.host) => {
        let url = host + 'load'
        axios
            .get(url)
            .then(response => {
                this.setState((prevState, props) => ({
                    pixels: response.data.pixel_values, 
                    image_size: response.data.image_size, 
                    button_styles : [],
                    score: 0, 
                    chosen_place: 0
                }))
                this.getColorOptions(this.props.host)
            })
    }

    getColorOptions = (host) => {
        let url = host + 'options'
        axios
            .get(url)
            .then(response => {
                let color_options = response.data.color_options
                this.setState((prevState, props) => ({
                    color_options
                }))                
                this.setButtonStyles()
            })
    }

    setButtonStyles = (choice) => {
        let button_dim = (this.state.image_size[0]/5)/2-2
        let button_styles = this.state.color_options.map((color, index) => {
            if (index == choice) {
                color = [236, 249, 249]
            }
            return {
                backgroundColor: `rgb(${color})`, 
                padding: `${button_dim}px ${button_dim}px`,
                borderRadius: '8px',
                marginBottom: '1px',
                display: 'inline',
                float:'left'
            }
        })
        this.setState((prevState, props) => ({
            button_styles
        })) 
    }

    chooseColor = (choice) => {
        let url = `${this.props.host}choose/${choice}`
        axios
            .get(url)
            .then(response => {
                this.setState((prevState, props) => ({
                    pixels: response.data.pixel_values, 
                    color_options: response.data.color_options,
                    chosen_place: response.data.chosen_place
                }))
                this.setButtonStyles(choice)
                this.updateScore()
            })
    }

    updateScore = () => {
        if (this.state.chosen_place == 1) {
            this.setState((prevState) => ({
                score: prevState.score + 10
            }))
        }
    }

    render() {
        return (
            <div className="Game">
                <div className="container">
                    <div className="row">
                        <div className="col">
                        </div>
                         <div className="col">
                            <Image pixels={this.state.pixels} imageSize={this.state.image_size} />
                            {
                                this.state.button_styles.map((button_style, i) => {
                                   {/* if (this.state.color_options[i].length != 0) {  */}
                                        return <Button key={i} place={i} buttonStyle={button_style} chooseColor={this.chooseColor} />
                                   {/* }  */}
                                })
                            }
                        </div>
                        <div className="col">
                            <Display reset={this.doInitialFetch} chosenPlace={this.state.chosen_place} score={this.state.score} />
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Game;