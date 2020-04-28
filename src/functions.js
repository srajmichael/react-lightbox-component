const convertToPx = (value) => {
    let regex = /(?<number>[\d]{1,})(?<unit>rem|vh|px|vw)/;

    let match = value.match(regex);
    let number = match.groups.number;
    let unit = match.groups.unit;

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

const unitToPixRatio = (unit)=>{
    let fontSize = getComputedStyle(document.documentElement).fontSize;

}