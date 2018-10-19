import React, { Component } from 'react';
import { connect } from 'react-redux'
import axios from 'axios';
import Image from './components/Image/Image'
import Button from './components/Button/Button'
import Display from './components/Display/Display'

import { doInitialFetch } from './actions/index'


class Game extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.doInitialFetch('new', this.props.host, 15)
    }

    getColorOptions = (num_colors, host = this.props.host) => {
        let url = `${host}options/${num_colors}`
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
        let button_dim = (this.props.image_size[0]/5)/2-2
        let button_styles = this.props.color_options.map((color, index) => {
            if (index == choice) {
                color = [236, 249, 249]
            }
            return {
                backgroundColor: `rgb(${color})`, 
                padding: `${button_dim}px ${button_dim}px`,
                border: '1px solid rgb(205,208,210)',
                borderRadius: '10px',
                margin: '1px',
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
        if (this.props.chosen_place == 1) {
            const percentage  = (100/this.props.color_options.length)
            this.setState((prevState) => ({
                score: prevState.score + 10,
                percentage: prevState.percentage + percentage
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
                         <div className="col-auto">
                            <Image pixels={this.props.pixels} imageSize={this.props.image_size} />
                            {
                                this.props.button_styles.map((button_style, i) => {
                                    return <Button key={i} place={i} buttonStyle={button_style} chooseColor={this.chooseColor}/>
                                })
                            }
                        </div>
                        <div className="col">
                            <Display reset={(num_colors) => {this.doInitialFetch('next', this.props.host, num_colors)}} chosenPlace={this.props.chosen_place} percentage={this.props.percentage} score={this.props.score} />
                        </div>
                    </div>
                    
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    color_options : state.color_options,
    pixels : state.pixels,
    image_size : state.image_size, 
    button_styles : state.button_styles,
    score : state.score, 
    percentage : state.percentage,
    chosen_place : state.chosen_place
})

const mapDispatchToProps = dispatch => ({
    doInitialFetch: (load_type, host, num_colors) => dispatch(doInitialFetch(load_type, host, num_colors))
})

export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(Game)