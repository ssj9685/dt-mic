import React from 'react';
import QRComp from './component/QRComp'
import Logo from './component/Logo'
import {createWebSocket} from 'websocket/WebSocketHandler'
import { setUUID, setPermission } from 'action/action';
import {connect} from 'react-redux';


class Panel extends React.Component{
    constructor(props){
        super(props);
        this.onWebsocketConnected = this.onWebsocketConnected.bind(this);
    }
    componentDidMount(){
        createWebSocket('panel',this.onWebsocketConnected);
    }
    render(){
        switch(this.props.permission){
            case true:
                return(
                    <QRComp/>
                )
            default:
                return(
                    <Logo/>
                )
        }
    }
    onWebsocketConnected(userName, stompClient){
        stompClient.subscribe('/user/'+userName+'/ClaimSession_Start',(uuid)=>{console.log(uuid);})
        stompClient.subscribe('/user/'+userName+'/ClaimSession_ShowQR',(uuid)=>{
            this.props.setUUID(uuid.body);
            this.props.setPermission(true);
        })
        stompClient.subscribe('/user/'+userName+'/ClaimSession_Finish',(uuid)=>{
            this.props.setPermission(false);
        })
    }
}

let stateToProps = (state) => {
    return {
        permission: state.reducer.permission,
        uuid: state.reducer.uuid,
    };
}

let dispatchToProps = (dispatch) => {
    return {
        setUUID: uuid => dispatch(setUUID(uuid)),
        setPermission: permission => dispatch(setPermission(permission)),
    }
}

Panel = connect(stateToProps, dispatchToProps)(Panel);

export default Panel;