import React from 'react';
import paperImg from 'resource/PaperAndPen.png';
import {setUUID} from 'action/action';
import {connect} from 'react-redux';

class ClaimGuide extends React.Component{
    constructor(props){
        super(props);
        this.submitInfo = this.submitInfo.bind(this);
    }
    componentDidMount(){
        const herf = window.location.href.split("?")[1];
        this.submitInfo(herf)
    }
    render(){
        return(
            <div style={{height:'100%',}}>
                <div style={{display:'flex',flexDirection:'column',margin:'0.5em',}}>
                    <div style={{display:'flex',justifyContent:'center',margin:'1em',}}>
                        <img style={{objectFit:'contain',width:'200px',height:'100px'}} src={paperImg} alt='img'/>
                    </div>
                    <div style={{borderBottom:'1px solid rgb(221,76,57)', textAlign:'center', margin:'1em',}}>
                        <div>새로운 질병/상해(교통)/휴대품손해(국내/해외여행)</div>
                        <div>사고의 보험금 청구를 하실 수 있습니다.</div>
                    </div>
                </div>
                <div className='guideTable' style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center',margin:'0.5em'}}>
                    <table>
                        <tbody>
                        <tr>
                            <th>대상</th>
                            <td colSpan="2">
                                <div>장기보험:계약자,피보험자,친권자</div>
                                <div>일반보험(국내여행/해외여행):개인계약자,피보험자</div>
                            </td>
                        </tr>
                        <tr>
                            <th>이용시간</th>
                            <td colSpan="2">24시간 365일</td>
                        </tr>
                        <tr>
                            <th>이용조건</th>
                            <td colSpan="2">
                                청구금액이 100만원 이하 건
                                *100만원을 초과할 경우 '원본서류' 제출이 필요하므로 우편/방문접수를 통해 접수
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                
            </div>
        )
    }
    async submitInfo(herf){
        await this.props.setUUID(herf);
        let data = {
            'sessionID':this.props.uuid,
        };

        fetch('https://lab.dja.kr/user/api/recvClaimData', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(res => res.json())
        .then(result => {
            //console.log(result)
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
        setUUID: uuid => dispatch(setUUID(uuid)),
    }
}

ClaimGuide = connect(stateToProps, dispatchToProps)(ClaimGuide);

export default ClaimGuide;