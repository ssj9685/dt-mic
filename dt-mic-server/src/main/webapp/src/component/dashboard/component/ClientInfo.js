import React from 'react';
import 'index.css'
import {setPermission} from 'action/action';
import {connect} from 'react-redux'

class ClientInfo extends React.Component{
    constructor(props){
        super(props);
        this.submitInfo = this.submitInfo.bind(this);
    }
    render(){
        return(
            <div style={{flex:1,display:'flex',flexDirection:'column'}}>
                <div style={{width:'100%',flex:1,backgroundColor:'black',display:'flex',justifyContent:'center',alignItems:'center',color:"white",}}>
                    INFO
                </div>
                <button style={{width:'100%',}} className='buttonStyles' onClick={this.submitInfo}>조제완료</button>
            </div>
        )
    }
    submitInfo(){
        let data = {
            'sessionID':this.props.uuid,
        };

        //console.log(JSON.stringify(data))

        fetch('https://lab.dja.kr/api/drugPrepComplete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            console.log(result)
            //if(result['result']==true){this.props.setPermission(false)}
        })
    }
}

let stateToProps = (state) => {
    return {
        uuid: state.reducer.uuid,
    };
}

let dispatchToProps = (dispatch) => {
    return {
        setPermission: permission => dispatch(setPermission(permission)),
    }
}

ClientInfo = connect(stateToProps, dispatchToProps)(ClientInfo);

export default ClientInfo;