import React from 'react';
import {connect} from 'react-redux';

//font: font-style font-variant font-weight font-size/line-height font-family
class Complete extends React.Component{
    constructor(props){
        super(props);
        this.submitInfoComplete = this.submitInfoComplete.bind(this);
    }
    componentDidMount(){
        this.submitInfoComplete()
    }
    render(){
        return(
            <div style={{color:'#255EE1',font:'normal bold 1em helvetica'}}>
                <p>청구가 완료되었습니다</p>
            </div>
        );
    }
    submitInfoComplete(){
        let data = {
            'sessionID':this.props.uuid,
        };

        console.log(JSON.stringify(data));
        fetch('https://lab.dja.kr/user/api/sendEmail', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            //console.log(result);
        })
    }
}

let stateToProps = (state) => {
    return {
        uuid: state.reducer.uuid,
    };
}

Complete = connect(stateToProps)(Complete);

export default Complete;