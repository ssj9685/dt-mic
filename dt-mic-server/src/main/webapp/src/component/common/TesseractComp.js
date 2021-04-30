import React from 'react';

var Tesseract = window.Tesseract;

class TesseractComp extends React.Component{
    componentDidMount(){
        Tesseract.recognize('tesseract-test.png', {
            lang: 'kor',
        })
        .then(result=>{
            console.log(result)
        })
    }
    render(){
        return(
            <></>
        );
    }
}

export default TesseractComp;