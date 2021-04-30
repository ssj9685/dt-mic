import React from 'react';
import {SessionComp,ClientInfo} from './component/component'
import Camera from 'component/common/Camera'
import {createWebSocket} from 'websocket/WebSocketHandler'
import {setPermission} from 'action/action'
import {connect} from 'react-redux'

class Dashboard extends React.Component{
    constructor(props){
        super(props);
        this.onWebsocketConnected = this.onWebsocketConnected.bind(this);
    }
    componentDidMount(){
        createWebSocket('dashboard',this.onWebsocketConnected);
    }
    render(){
        switch(this.props.permission){
            case true:
                return(
                    <div style={{position:'relative',display:'flex',height:'100%',width:'100%',}}>
                        <Camera/>
                        <ClientInfo/>
                    </div>
                )
            default:
                return (
                    <div style={{height:'100%',width:'100%',display:'flex',justifyContent:'center',alignItems:'center',}}>
                        <SessionComp/>
                    </div>
                )
        }
    }
    onWebsocketConnected(userName, stompClient){
        stompClient.subscribe('/user/'+userName+'/ClaimSession_Start',(uuid)=>{console.log(uuid);})
        stompClient.subscribe('/user/'+userName+'/ClaimSession_Finish',(uuid)=>{
            console.log(uuid);
            this.props.setPermission(false);
        })
    }
}

let stateToProps = (state) => {
    return {
        permission: state.reducer.permission,
    };
}

let dispatchToProps = (dispatch) => {
    return {
        setPermission: permission => dispatch(setPermission(permission)),
    }
}

Dashboard = connect(stateToProps, dispatchToProps)(Dashboard);

export default Dashboard;