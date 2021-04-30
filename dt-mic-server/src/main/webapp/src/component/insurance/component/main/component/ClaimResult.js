import React from 'react';
import {connect} from 'react-redux';

class ClaimResult extends React.Component{
    constructor(props){
        super(props);
        this.submitInfoComplete = this.submitInfoComplete.bind(this);
    }
    componentDidMount(){
        this.submitInfoComplete()
    }
    render(){
        return(
            <div style={{height:'100%',}}>
                <div style={{marginTop:'2em'}}>
                    <table className='commonTable'>
                    <caption style={{textAlign:'left',padding:'0em 0em 0.5em 1em'}}><strong>사고정보</strong></caption>
                        <tbody>
                            <tr>
                                <th>사고유형</th>
                                <td>{this.props.checked['accident']}</td>
                            </tr>
                            <tr>
                                <th>사고일시</th>
                                <td>{this.props.date}</td>
                            </tr>
                            <tr>
                                <th>사고내용</th>
                                <td>{this.props.accidentData}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div style={{marginTop:'2em'}}>
                    <table className='commonTable'>
                    <caption style={{textAlign:'left',padding:'0em 0em 0.5em 1em'}}><strong>지급계좌정보</strong></caption>
                        <tbody>
                            <tr>
                                <th>수익자</th>
                                <td>{this.props.beneficiary}</td>
                            </tr>
                            <tr>
                                <th>예금주</th>
                                <td>{this.props.name}</td>
                            </tr>
                            <tr>
                                <th>주민번호</th>
                                <td>{this.props.pidNum}</td>
                            </tr>
                            <tr>
                                <th>은행명</th>
                                <td>{this.props.bank}</td>
                            </tr>
                            <tr>
                                <th>계좌번호</th>
                                <td>{this.props.account}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
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
        checked: state.reducer.checked,
        date: state.reducer.date,
        accidentData: state.reducer.accidentData,
        name: state.reducer.name,
        pidNum: state.reducer.pidNum,
        company: state.reducer.company,
        bank: state.reducer.bank,
        account: state.reducer.account,
        beneficiary: state.reducer.beneficiary,
        uuid:state.reducer.uuid,
    };
}

ClaimResult = connect(stateToProps)(ClaimResult);

export default ClaimResult;