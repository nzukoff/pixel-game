import React, { Component } from 'react';
import axios from 'axios';
import Image from './Image'
import Button from './Button'

class Game extends Component {
    constructor(props) {
        super(props)
        this.state={
            color_options : [],
            pixels : [],
            image_size : [], 
            button_styles : []
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
            })
        this.getColorOptions(this.props.host)
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
                let color_options = response.data.color_options
                this.setState((prevState, props) => ({
                    pixels: response.data.pixel_values, 
                    color_options
                }))
            })
        this.setButtonStyles()
    }


    render() {
        return (
            <div className="Game">
                <Image pixels={this.state.pixels} image_size={this.state.image_size} />
                {
                    this.state.button_styles.map((button_style, i) => {
                        if (this.state.color_options[i].length != 0) {
                            return <Button key={i} place={i} button_style={button_style} chooseColor={this.chooseColor} />
                        } else {
                            return <div key={i}></div>
                        }
                    })
                }
            </div>
        );
    }
}

export default Game;