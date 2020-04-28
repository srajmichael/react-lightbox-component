export default class ConvertUnits{
    static num = 2;
    static regex = /(?<number>[\d]{1,}?\.{0,1}[\d]{0,})(?<unit>rem|vh|px|vw)(?!\S)/;

    static matchedNumberAndUnit(textValue){
        let match = textValue.match(this.regex);
        let number = 0;
        let unit = '';
        if(match){
            if(match.groups){
                if(match.groups.number && match.groups.unit){
                    number = parseFloat(match.groups.number);
                    unit = match.groups.unit;
                }else{
                    throw new Error('Number or unit not found');
                }
            }else{
                throw new Error('No group matches found');
            }
        }else{
            throw new Error('String provided does not contain correct units');
        }
        return {
            number,
            unit
        }
    }


    static convertTo(unit, textValue){
        
            switch(unit){
                case 'px':
                    return this.convertToPx(textValue);
                case 'rem':
                    return this.convertToRem(textValue);
                case 'vh':
                    return this.convertToVh(textValue);
                case 'vw': 
                    return this.convertToVw(textValue);
                default:
                    return textValue;
            }
    }


    static convertToPx(textValue){
            let {number, unit} = this.matchedNumberAndUnit(textValue);

        
            const remToPx = (value) =>{
                const fontSize = getComputedStyle(document.documentElement).fontSize;
                return parseFloat(fontSize) * value;
            }
            
            const vhToPx = (value) =>{
                const vh = parseFloat(window.innerHeight);
                return vh * (value/100);
            }
            
            const vwToPx = (value) =>{
                const vw = parseFloat(window.innerWidth);
                return vw * (value/100);
            }
        
            switch(unit){
                case 'rem': 
                    return remToPx(number);
                case 'vh':
                    return vhToPx(number);
                case 'vw':
                    return vwToPx(number);
                default:
                    return number;
            }
        
    }

    static convertToRem(textValue){
        let {number, unit} = this.matchedNumberAndUnit(textValue);
        let oneRemInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
    
        const pxToRem = (value) =>{
            return value / oneRemInPx;
        }
    
        const vhToRem = (value) =>{
            const px = (value/100) * parseFloat(window.innerHeight);
            return px / oneRemInPx;
        }
    
        const vwToRem = (value) =>{
            const px = (value/100) * parseFloat(window.innerWidth);
            return px / oneRemInPx;
        }  
        
        switch(unit){
            case 'px': 
                return pxToRem(number);
            case 'vh':
                return vhToRem(number);
            case 'vw':
                return vwToRem(number);
            default:
                return number;
        }
    
    }


    static convertToVh(textValue){
        let {number, unit} = this.matchedNumberAndUnit(textValue);
        let vhInPx = parseFloat(window.innerHeight);
    
        const pxToVh = (value) =>{
            return value / vhInPx;
        }
    
        const remToVh = (value) =>{
            let oneRemInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
            return (oneRemInPx * value) / vhInPx;
        }
    
        const vwToVh = (value) =>{
            return ( (window.innerWidth * (value/100) ) /vhInPx) * 100;
        }  
    
        switch(unit){
            case 'px': 
                return pxToVh(number);
            case 'rem':
                return remToVh(number);
            case 'vw':
                
                return vwToVh(number);
            default:
                return number;
        }
    }




    static convertToVw(textValue){
        let {number, unit} = this.matchedNumberAndUnit(textValue);
        let vwInPx = parseFloat(window.innerWidth);
        
        const pxToVw = (value) =>{
            return value / vwInPx;
        }
    
        const remToVw = (value) =>{
            let oneRemInPx = parseFloat(getComputedStyle(document.documentElement).fontSize);
            return (oneRemInPx * value) / vwInPx;
        }
    
        const vhToVw = (value) =>{
            return ( (window.innerHeight * (value/100) ) /vwInPx) * 100;
        }  
    
        switch(unit){
            case 'px': 
                return pxToVw(number);
            case 'rem':
                return remToVw(number);
            case 'vh':
                return vhToVw(number);
            default:
                return number;
        }
    }

  
}

