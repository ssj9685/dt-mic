import * as SockJS from 'sockjs-client';
import Stomp from "stompjs"
var socket
var stompClient
var connection;
var createCallback;
const onconnect = (frame)=>{
    
    whoisme(function(result){
        if(!result.result)
        {
            console.log("식별 실패");
            socket.close();
            return
        }
        connection = true
        var userName = result.name;
        console.log("식별성공:"+userName);
        createCallback(userName, stompClient)

    console.log("stomp connected"+frame)

    })
}
const onerr = (frame)=>{
    console.log("err"+frame)
    connection = false
    socket.close();
}
export const createWebSocket = (type, cb) =>
{
    createCallback = cb;
    socket =new SockJS('/websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({"type":type},onconnect, onerr);

}
const whoisme = (cb)=>{
    fetch('/api/whoisme', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(res => res.json())
    .then(result => {
        cb(result)
    })
}

export const sendDisconnect = () => {
    stompClient.deactivate();
    
}

export const sendMessage = (key, value) => {
    if(connection)
    {
        stompClient.send("/app/"+key,{},value)
        return true
    }
    else
    {
        console.log('error not connection')
    }
    return false

}