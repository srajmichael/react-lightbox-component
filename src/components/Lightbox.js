import React from 'react';
import ImageBox from './ImageBox';



class Lightbox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            currentImage: props.currentImage,
            imageWidth: 0,
            imageHeight: 0,
            imgOpacity: 0,
            timeOut: props.timeOut || 500,
            timeOutOrigin: props.timeOut || 500,
            overlayVisibility: 'hidden',
            overlayOpacity: '0',
            inTransition: false
        }
        this.handleOpenToggle = props.toggleOpen;

        this.stylesList = props.stylesList || ({} = { overlay: {}, imagePadding: {} });
        

        this.overlayStyles = {
            background: 'rgba(0,0,0,.8)',
            ...this.stylesList.overlay,
            position: 'fixed',
            top: '100',
            left: '0',
            width: '100vw',
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
            
        };
        this.imagePaddingStyles = {
            border: '2px solid #222',
            background: '#888',
            padding: '1.5rem',
            ...this.stylesList.imagePadding
        }
    }

    componentDidMount(){

        this.handleOpenToggle(
            ()=>{
                return this.state.isOpen;
            },
            (newOpenState)=>{
                if(!this.state.inTransition){
                    this.setState(()=>({isOpen: newOpenState, inTransition:true}))
                    if(newOpenState){
                        this.setState(()=>({overlayVisibility: 'visible'}));
                        setTimeout(()=>{
                            this.setState(()=>({overlayOpacity: '1', inTransition:false}));
                        },50);
                    }else{
                        this.setState(()=>({overlayOpacity: '0'}));
                        this.setWidthAndHeight(0,0);
                        setTimeout(()=>{
                            this.setState(()=>({overlayVisibility: 'hidden',imgOpacity: '0',inTransition:false}));
                            
                        },this.state.timeOutOrigin + 50);
                    }
                }
            },
            (src)=>{
                    this.handleImageChange(src);
            }
            )
    }

    handleImageChange(src){
        const img = new Image();
        img.onload = () =>{
            if(this.state.isOpen){
                this.setState(()=>({imgOpacity: 0, timeOut: 100}));
                const w = img.width;
                const h = img.height;
                this.setWidthAndHeight(w,h);
                setTimeout(()=>{
                    this.setState((prevState)=>({currentImage: src, timeOut:prevState.timeOutOrigin}))
                },this.state.timeOutOrigin);
                setTimeout(()=>{
                    this.setState(()=>({currentImage: src, imgOpacity: 1}))
                },this.state.timeOutOrigin+100);
            }
        }
        img.src = src;
    }

    setWidthAndHeight(w,h){
        const windowH = parseFloat(window.innerHeight);
        const windowW = parseFloat(window.innerWidth);
        const paddingAllowancePerSide = 60;

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
        let lightboxTransition = 'opacity ' + this.state.timeOutOrigin + 'ms linear';
        if(this.state.isOpen){
            lightboxTransition = 'opacity 400ms linear';
        }
        return (
        <div className='lightbox' style={{...this.overlayStyles, opacity: this.state.overlayOpacity, visibility: this.state.overlayVisibility, transition: lightboxTransition}}>
            <ImageBox 
            currentImage={this.state.currentImage}
            width={this.state.imageWidth}
            height={this.state.imageHeight}
            imagePaddingStyles={this.imagePaddingStyles}
            opacity={this.state.imgOpacity}
            transitionSpeed={this.state.timeOut}
            transitionOrigin={this.state.timeOutOrigin}
            />
        </div>
        ) 
    }
}


export default Lightbox;

