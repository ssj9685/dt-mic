import React from "react";
import QRCode from "./qrcode";
import {connect} from 'react-redux';

class QRComp extends React.Component{
    constructor(props){
        super(props);
        this.qrCodeRef = React.createRef();
    }
    componentDidMount(){
        new QRCode(this.qrCodeRef.current, {
            text: "https://lab.dja.kr/user?"+this.props.uuid.slice(1,-1),
            width:256,
            height:256,
            correctLevel : QRCode.CorrectLevel.M
        });
    }
    render(){
        return(
            <div style={{height:'100%',display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',overflow:'auto'}}>
                <div style={{font:'normal bold 5vw helvetica'}}>카메라로 QR코드를 인식시켜주세요</div>
                <div style={{margin:'2em',}} ref={this.qrCodeRef} />
                <div>qr코드 스캔이 불가하시다면 아래의 주소로 들어가세요</div>
                <div>{this.props.uuid}</div>
            </div>
        )
    }
}

let stateToProps = (state) => {
    return {
        uuid: state.reducer.uuid,
    };
}

QRComp = connect(stateToProps)(QRComp)

export default QRComp