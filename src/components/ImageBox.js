import React from 'react';





class ImageBox extends React.Component{
    constructor(props){
        super(props);

    }




    render(){
        let transition = 'all ' + this.props.transitionSpeed + 'ms linear';
        let transitionOrigin = 'all ' + this.props.transitionOrigin + 'ms linear';
        return(
            <div className='image-padding' style={this.props.imagePaddingStyles}>
                <div className='image-box' style={{width: this.props.width + 'px', height: this.props.height + 'px', transition:transitionOrigin, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <img style={{width: '100%', opacity: this.props.opacity, transition:transition}} src={this.props.currentImage}/>
                </div>
            </div>

        )
    }
}

export default ImageBox;