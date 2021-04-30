import React from 'react';
import pharmacyImg from 'resource/DT_MIC.png'

class Logo extends React.Component{
    render(){
        return(
            <div style={{height:'100%',width:'100%',textAlign:'center',}}>
                <div style={{font:'7vw helvetica'}}
                >dt-mic outdoor panel</div>
                <div>
                    <img src={pharmacyImg} style={{height:'100vh', width:'100vw', objectFit:'contain'}} alt="LOGO"/>
                </div>
            </div>
        )
    }
}

export default Logo;