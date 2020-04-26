import React from 'react';
import ImageBox from './ImageBox';



class Lightbox extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            isOpen: false,
            currentImage: props.currentImage,
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

                this.setState(()=>({currentImage: src}))
            }
            )
    }

    getWidthAndHeight(src){
        
    }


    render(){
        return (
        <div>
            <ImageBox 
            currentImage={this.state.currentImage}
            width={}
            height={}
            />
        </div>
        ) 
    }
}


export default Lightbox;

