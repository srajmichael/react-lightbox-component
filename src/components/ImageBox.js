import React from 'react';





class ImageBox extends React.Component{
    constructor(props){
        super(props);

    }




    render(){
        return(
            <div style={`width:${this.props.width}px; height: ${this.props.height}; transition: 500mes ease`}>
                <img src={this.props.currentImage}/>
                <img src='http://michaelsraj.com/ciurla/images/darth.png'/>
                <img src='http://michaelsraj.com/ciurla/images/vertical.jpg'/>
            </div>
        )
    }
}

export default ImageBox;