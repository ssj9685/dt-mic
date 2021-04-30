import React from 'react';
import {setReceipt} from 'action/action';
import {connect} from 'react-redux';

const buttonStyle={
    position:'absolute',
    bottom:'0.3em',
    color:"#dddddd",
    border:"5px solid #FFFFFF",
    backgroundColor:'#CCCCCC',
    borderRadius:'50%',
    width:'1.5em',
    height:'1.5em',
    opacity:0.8,
    font:'normal bold 2em helvetica',
}

class Camera extends React.Component{
    constructor(props){
        super(props);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
        this.handleCapture = this.handleCapture.bind(this);
        this.handleReset = this.handleReset.bind(this);
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this)
        this.setMediaStreamToVideo = this.setMediaStreamToVideo.bind(this);
        this.divBox = React.createRef()
        this.videoTag = React.createRef()
        this.canvas = React.createRef()
        this.captureButton = React.createRef()
        this.resetButton = React.createRef()
    }
    componentDidMount(){
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions)
        this.setMediaStreamToVideo().then(()=>this.videoTag.current.play());
        this.resetButton.current.style.display = 'none'
        this.canvas.current.style.display = 'none'
    }

    componentWillUnmount(){
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    render(){
        return(
            <div ref={this.divBox} 
                style={{
                    backgroundColor:'#507DF0',
                    width:'100%',
                    flex:1,
                    position:'relative',
                    display:'flex',
                    justifyContent:'center',
                    alignItems:'center',
                    overflow:'auto',
                }}>
                <video ref={this.videoTag} autoPlay playsInline muted/>
                <canvas ref={this.canvas} width='0' height='0'/>
                <div ref={this.captureButton} style={buttonStyle} onClick={this.handleCapture}/>
                <div ref={this.resetButton} style={buttonStyle} onClick={this.handleReset}>
                    <img style={{width:'1.5em',height:'1.5em',}} src='1024px-Refresh_icon.svg.png' alt='refresh'/>
                </div>
            </div>
        )
    }

    handleCapture(){
        this.canvas.current.width = this.videoTag.current.videoWidth;
        this.canvas.current.height = this.videoTag.current.videoHeight;
        this.videoTag.current.style.display = 'none'
        this.canvas.current.style.display = 'block'
        var context = this.canvas.current.getContext('2d');

        this.resetButton.current.style.display = 'block'
        this.captureButton.current.style.display = 'none'

        context.drawImage(this.videoTag.current,0,0);
        var img = new Image();
        img.src = this.canvas.current.toDataURL();
        this.props.setReceipt(img.src);
        img.onload = ()=>{
            context.drawImage(img,0,0);
        };
    };

    handleReset(){
        this.videoTag.current.style.display = 'block';
        this.canvas.current.style.display = 'none';
        this.resetButton.current.style.display = 'none'
        this.captureButton.current.style.display = 'block'
    }


    updateWindowDimensions(){
        this.setMediaStreamToVideo()
    }

    setMediaStreamToVideo(){
        return(
            navigator.mediaDevices.getUserMedia({
                audio: false,
                video: {
                    width: this.divBox.current.clientWidth,
                    height: this.divBox.current.clientHeight,
                    facingMode: 'environment'
                }})
        )
        .then(stream => this.videoTag.current.srcObject = stream)
    }
}

let stateToProps = (state) => {
    return {
        receipt: state.reducer.receipt,
    };
}

let dispatchToProps = (dispatch) => {
    return {
        setReceipt: img => dispatch(setReceipt(img)),
    }
}

Camera = connect(stateToProps, dispatchToProps)(Camera);

export default Camera;