import React from 'react';
import { setPermission } from 'action/action';
import {connect} from 'react-redux';

const formStyle={
    height:"100%",
    backgroundColor:"#255EE1",
    display:"flex",
    flexDirection:'column',
    alignItems:"center",
    justifyContent:"center"
}
const inputStyle = {
    height:"2em",
    width:"50%",
    margin:"0.5em",
    padding:"0.5em",
    border:"none",
    outline:"none",
}

const submitStyle={
    height:"3em",
    width:"35%",
    margin:"0.5em",
    padding:"0.5em",
    color:"white",
    backgroundColor:"#003AB6",
    border:"none",
    outline:"none",
}

class Signin extends React.Component{
    constructor(props){
        super(props)
        this.form = React.createRef();
        this.submitInfo = this.submitInfo.bind(this);
    }

    submitInfo(e){
        e.preventDefault();
        let fd = new FormData(this.form.current);
        let data = {};
        for (let [id, pw] of fd) {
          data[id] = pw;
        }
        data['userType'] = this.props.path.slice(1);
        console.log(data['userType']);
        //data['userType'] = this.props.path
        console.log(JSON.stringify(data));
        fetch('https://lab.dja.kr/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(data => data.json())
        .then(data => {
            console.log(data);
            this.props.setPermission(data['result']);
        })
    }

    render(){
        return(
            <form ref={this.form} style={formStyle}>
                <h1 style={{color:"white"}}>Sign-in</h1>
                <input type="text" style={inputStyle} name="username" placeholder="ID"/>
                <input type="password" style={inputStyle} name="password" placeholder="PW"/>
                <button style={submitStyle} onClick={e=>{this.submitInfo(e)}}>
                    sign-in
                </button>
                <div style={this.props.style}>Please check your ID and PW</div>
            </form>
        )
    }
}

let dispatchToProps = (dispatch) => {
    return {
        setPermission: permission => dispatch(setPermission(permission)),
    }
}

Signin = connect(undefined, dispatchToProps)(Signin);

export default Signin;