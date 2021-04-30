import React from 'react';
import {sendMessage} from 'websocket/WebSocketHandler'
import { setPermission, setUUID } from 'action/action';
import {connect} from 'react-redux'
import 'index.css'

class SessionComp extends React.Component{
    constructor(props){
        super(props);
        this.openNewSession = this.openNewSession.bind(this);
    }
    render(){
        return(
            <div style={{height:'100%',width:'100%',display:"flex",flexDirection:'column',justifyContent:'center',alignItems:'center'}}>

                <div
                    style={{
                        width:'100%',
                        flex:1,
                        display:"flex",
                        flexDirection:'column',
                        justifyContent:'center',
                        alignItems:'center',
                        backgroundColor:'#255EE1',
                        color:'white',
                        font:'2em helvetica',
                    }}>
                    차량 관리 페이지
                </div>

                <div
                    style={{
                        width:'100%',
                        height:'100%',
                        display:'flex',
                        flex:6,
                        justifyContent:'center',
                        alignItems:'center',
                    }}>
                    <div
                        style={{
                            width:'100%',
                            height:'100%',
                            flex:1,
                            display:"flex",
                            flexDirection:'column',
                            justifyContent:'space-around',
                            alignItems:'center',
                        }}>
                        <button className='buttonStyles' style={{width:'50%',}} onClick={this.openNewSession}>차량 진입</button>
                        <button className='buttonStyles' style={{width:'50%',}} onClick={this.bsendMessage}>sendMessage</button>
                    </div>

                    <div
                        style={{
                            flex:1,
                            height:'100%',
                            width:'50%',
                            display:"flex",
                            flexDirection:'column',
                            justifyContent:'center',
                            alignItems:'center',
                            backgroundColor:'black',
                            color:'white',
                            font:'2em helvetica',
                        }}>
                        INFO
                    </div>
                </div>
            </div>
        )
    }
    bsendMessage()
    {
        sendMessage("test", "asdasdfffeasdasd")
    }
    openNewSession(){
        fetch('https://lab.dja.kr/api/createNewSession', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            if(result['result']===true){
                this.props.setPermission(true);
                this.props.setUUID(result['sessionID'])
            }
        })
    }
}

let dispatchToProps = (dispatch) => {
    return {
        setPermission: permission => dispatch(setPermission(permission)),
        setUUID: uuid => dispatch(setUUID(uuid)),
    }
}

SessionComp = connect(undefined, dispatchToProps)(SessionComp);

export default SessionComp;