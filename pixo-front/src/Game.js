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
            image_size : []
        }
        this.doInitialFetch = this.doInitialFetch.bind(this);
        this.getColorOptions = this.getColorOptions.bind(this);
        this.chooseColor = this.chooseColor.bind(this);
    }

    componentDidMount(){
        this.doInitialFetch(this.props.host)
        this.getColorOptions(this.props.host)
    }

    doInitialFetch(host) {
        let url = host + 'load'
        axios
            .get(url)
            .then(response => {
                this.setState((prevState, props) => ({
                    pixels: response.data.pixel_values, 
                    image_size: response.data.image_size
                }))
            })
    }

    chooseColor(choice) {
        let button_id = 1
        let url = `${this.props.host}choose/${choice}`
        axios
            .get(url)
            .then(response => {
                this.setState((prevState, props) => ({
                    pixels: response.data.pixel_values, 
                }))
            })
    }

    getColorOptions(host) {
        let url = host + 'options'
        axios
            .get(url)
            .then(response => {
                this.setState((prevState, props) => ({
                    color_options: response.data.color_options
                }))                
            })
    }

    // createImage(pixels, image_size) {
    //     const canvas = this.refs.canvas
    //     const ctx = canvas.getContext("2d")
    //     // ctx.fillStyle = 'rgb(200,0,0)';
    //     // ctx.fillRect(10, 10, 55, 50);
    //     // const img = this.refs.image
    //     const imgData=ctx.createImageData(image_size ? image_size[0] : 1, image_size ? image_size[1] : 1);
    //     var data = imgData.data;
    //     console.log("PIX ARE ", pixels)
    //     if (pixels.length != 0) {
    //         for (let i=0;i<imgData.data.length;i++)
    //         {
    //           data[i]=pixels[i];
    //         }
    //     }
    //     ctx.putImageData(imgData, 0, 0);
    //     // img.onload = () => {
    //     //     ctx.drawImage(img, 0, 0)
    //     // }
    //     // this.props.dataURI = canvas.toDataURL()
        

    // }
                    // <Button color_options={this.state.color_options} />

                                        // console.log("STATE IS ", this.state.color_options)
                    // {color_options = this.state.color_options
                    // console.log('COL OPTIONS ARE ', color_options)
                    // this.state.color_options.map((color) => {
                    //     <Button color_option={color} />
                    // })

    render() {
        return (
            <div className="Game">
                <Image pixels={this.state.pixels} image_size={this.state.image_size} />
                {
                    this.state.color_options.map((color, i) => {
                        return <Button key={i} index={i} color_option={color} chooseColor={this.chooseColor} />
                    })
                }
            </div>
        );
    }
}

export default Game;