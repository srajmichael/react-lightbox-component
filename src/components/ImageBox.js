import React from 'react';





class ImageBox extends React.Component{
    constructor(props){
        super(props);

    }




    render(){
        console.log(this.props.width, this.props.height)

        return(
            <div className='image-box' style={{width: this.props.width + 'px', height: this.props.height + 'px', transition: 'all 500ms ease'}}>
                <img src={this.props.currentImage}/>
            </div>
        )
    }
}

export default ImageBox;