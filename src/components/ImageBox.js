import React from 'react';


class ImageBox extends React.Component{
    render(){
        let {
            transitionSpeed,
            transitionOriginSpeed,
            imagePaddingStyles,
            width,
            height,
            opacity,
            currentImage
        } = this.props;
        let transition = 'all ' + transitionSpeed + 'ms linear';
        let transitionOrigin = 'all ' + transitionOriginSpeed + 'ms linear';
        return(
            <div className='image-padding' style={imagePaddingStyles}>
                <div className='image-box' style={{width: width + 'px', height: height + 'px', transition:transitionOrigin, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                    <img style={{width: '100%', opacity, transition}} src={currentImage}/>
                </div>
            </div>
        )
    }
}




// class ImageBox extends React.Component{
//     constructor(props){
//         super(props);

//     }




//     render(){
//         let transition = 'all ' + this.props.transitionSpeed + 'ms linear';
//         let transitionOrigin = 'all ' + this.props.transitionOrigin + 'ms linear';
//         return(
//             <div className='image-padding' style={this.props.imagePaddingStyles}>
//                 <div className='image-box' style={{width: this.props.width + 'px', height: this.props.height + 'px', transition:transitionOrigin, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
//                     <img style={{width: '100%', opacity: this.props.opacity, transition:transition}} src={this.props.currentImage}/>
//                 </div>
//             </div>

//         )
//     }
//}

export default ImageBox;