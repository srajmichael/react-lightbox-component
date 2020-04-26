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
        let useHeight = true;

        if( (windowW/windowH) < (w/h) ){
            useHeight = false;
        }

        if(useHeight){
            let newH = windowH - (paddingAllowancePerSide * 2);
            let newW = (windowW/windowH) * newH;
            this.setState(()=>({imageWidth: newW, imageHeight: newH}));
        }else{
            let newW = windowW - (paddingAllowancePerSide * 2);
            let newH = (windowH/windowW) * newW;
            this.setState(()=>({imageWidth: newW, imageHeight: newH}));
        }
    }


    render(){
        return (
        <div>
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

