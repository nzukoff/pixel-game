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
            score : 0
        }
    }

    componentDidMount() {
        this.doInitialFetch(this.props.host)
    }

    doInitialFetch = (host) => {
        let url = host + 'load'
        axios
            .get(url)
            .then(response => {
                this.setState((prevState, props) => ({
                    pixels: response.data.pixel_values, 
                    image_size: response.data.image_size
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

    setButtonStyles = () => {
        let button_styles = this.state.color_options.map((color) => {
            return {
                backgroundColor: `rgb(${color})`, 
                padding: '16px 16px', 
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
                this.setButtonStyles()
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
                <Image pixels={this.state.pixels} imageSize={this.state.image_size} />
                {
                    this.state.button_styles.map((button_style, i) => {
                        if (this.state.color_options[i].length != 0) {
                            return <Button key={i} place={i} buttonStyle={button_style} chooseColor={this.chooseColor} />
                        } else {
                            return <div key={i}></div>
                        }
                    })
                }
                <Display chosenPlace={this.state.chosen_place} score={this.state.score} />
            </div>
        );
    }
}

export default Game;