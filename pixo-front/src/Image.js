import React, { Component } from 'react';

class Image extends Component {
    constructor(props) {
        super(props)
        this.createImage = this.createImage.bind(this);
    }
    
    componentDidUpdate() {
        this.createImage(this.props.pixels, this.props.image_size)
    }

    createImage(pixels, image_size) {
        const canvas = this.refs.canvas
        const ctx = canvas.getContext("2d")
        
        const imgData=ctx.createImageData(image_size ? image_size[0] : 1, image_size ? image_size[1] : 1);
        var data = imgData.data;
        console.log("PIX ARE ", pixels)
        if (pixels.length != 0) {
            for (let i=0;i<imgData.data.length;i++)
            {
              data[i]=pixels[i];
            }
        }
        ctx.putImageData(imgData, 0, 0);
    }

    render() {
        return (
            <div className="Image">
                <canvas ref="canvas" width={this.props.image_size ? this.props.image_size[0] : 1} height={this.props.image_size ? this.props.image_size[1] : 1}/>
            </div>
        );
    }
}

export default Image;