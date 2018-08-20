import React, { Component } from 'react';
import axios from 'axios';
import Image from './Image'

class Game extends Component {
    constructor(props) {
        super(props)
        this.state={}
        this.doInitialFetch = this.doInitialFetch.bind(this);
        this.getColorOptions = this.getColorOptions.bind(this);
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
                console.log("RESPONSE IS ", response)
                this.setState({
                    pixels: response.data.pixel_values, 
                    image_size: response.data.image_size
                })
            })
    }

    getColorOptions(host) {
        let url = host + 'options'
        axios
            .get(url)
            .then(response => {
                console.log("OPTIONS ARE ", response)
                
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

    render() {
        return (
            <div className="Game">
                <Image pixels={this.state.pixels} image_size={this.state.image_size}/>
            </div>
        );
    }
}

export default Game;