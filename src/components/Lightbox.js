import React from 'react';
import ImageBox from './ImageBox';



class Lightbox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            currentImage: props.currentImage,
            imageWidth: 0,
            imageHeight: 0
        }
        this.handleOpenToggle = props.toggleOpen;
    }

    componentDidMount(){

        this.handleOpenToggle(
            ()=>{
                return this.state.isOpen;
            },
            (newOpenState)=>{
                this.setState(()=>({isOpen: newOpenState}))
            },
            (src)=>{
                this.handleImageChange(src)
                this.setState(()=>({currentImage: src}))
            }
            )
    }

    handleImageChange(src){
        const img = new Image();
        img.onload = () =>{
            const w = img.width;
            const h = img.height;
            this.setWidthAndHeight(w,h);
        }
        img.src = src;
    }

    setWidthAndHeight(w,h){
        const windowH = parseFloat(window.innerHeight);
        const windowW = parseFloat(window.innerWidth);
        const paddingAllowancePerSide = 40;

        const windowRatio = windowW / windowH;
        const imageRatio = w/h;
        let newH = 0;
        let newW = 0;

        if(windowRatio > imageRatio){
            newH = windowH - (paddingAllowancePerSide * 2);
            newW = newH * imageRatio;
        }else{
            newW = windowW - (paddingAllowancePerSide * 2);
            newH = newW * (1/imageRatio);
        }
        if(h < newH || w < newW){
                newH = h;
                newW = w;
        }
        this.setState(()=>({imageWidth: newW, imageHeight: newH}));
    }


    render(){
        return (
        <div className='lightbox'>
            <ImageBox 
            currentImage={this.state.currentImage}
            width={this.state.imageWidth}
            height={this.state.imageHeight}
            />
        </div>
        ) 
    }
}


export default Lightbox;

