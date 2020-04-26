import React from 'react';
import ReactDOM from 'react-dom';
import Lightbox from './components/Lightbox';



const toggleOpen = (getCurrentlyOpen, setCurrentlyOpen, changeImageTo) => {
    window.addEventListener('click', (e)=>{
        const currentlyOpen = getCurrentlyOpen();
        if(currentlyOpen){
            console.log('closing')
            setCurrentlyOpen(false);
        }else{
            console.log('opening')
            setCurrentlyOpen(true);
        }
        if(e.target.tagName.toLowerCase() === 'img'){
            changeImageTo(e.target.src);
        }
    })
}






const jsx = (
    <div>
        <Lightbox 
        currentImage='http://michaelsraj.com/ciurla/images/darth.png'
        toggleOpen={toggleOpen}
        />
    </div>  
);





ReactDOM.render(jsx, document.getElementById('app'));