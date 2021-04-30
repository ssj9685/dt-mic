import React from 'react';
import {setEmail,setPhoneNum,setAgreePage} from 'action/action';
import {CreditAgree,LookUpAgree,ServeAgree,InfoAgree} from './agrees/Agrees';
import {connect} from 'react-redux';

class AgreePage extends React.Component{
    render(){
        if(!this.props.agreePage){
        return(
            <div style={{width:'100%',height:'100%',}}>
                <div style={{marginTop:'2em'}}>
                    <table style={{width:'100%',tableLayout:'fixed',textAlign:'center'}}>
                        <caption><strong><span style={{color:'red'}}>[필수]</span>보험금 청구를 위한 개인(신용)정보 처리 필수 동의서</strong></caption>
                        <tbody>
                            <tr>
                                <th colSpan="2"><span style={{color:'red'}}>필수</span></th>
                                <td colSpan="5">개인(신용)정보 수집/이용</td>
                                <td colSpan="2">
                                    <div style={{color:'white',backgroundColor:'rgb(71,83,97)',font:'0.8em helvetica',}} onClick={()=>{this.props.setAgreePage(!this.props.agreePage,1)}}>
                                        {this.props.collect ? <div style={{padding:'0.3em',backgroundColor:'rgb(48,173,126)'}}>완료</div>: <div style={{padding:'0.3em'}}>내용보기</div>}
                                    </div>
                                </td>
                                
                            </tr>
                            <tr>
                                <th colSpan="2"><span style={{color:'red'}}>필수</span></th>
                                <td colSpan="5">개인(신용)정보 조회</td>
                                <td colSpan="2">
                                    <div style={{color:'white',backgroundColor:'rgb(71,83,97)',font:'0.8em helvetica',}} onClick={()=>{this.props.setAgreePage(!this.props.agreePage,2)}}>
                                        {this.props.lookUp ? <div style={{padding:'0.3em',backgroundColor:'rgb(48,173,126)'}}>완료</div>: <div style={{padding:'0.3em'}}>내용보기</div>}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2"><span style={{color:'red'}}>필수</span></th>
                                <td colSpan="5">개인(신용)정보 제공</td>
                                <td colSpan="2">
                                    <div style={{color:'white',backgroundColor:'rgb(71,83,97)',font:'0.8em helvetica'}} onClick={()=>{this.props.setAgreePage(!this.props.agreePage,3)}}>
                                        {this.props.credit ? <div style={{padding:'0.3em',backgroundColor:'rgb(48,173,126)'}}>완료</div>: <div style={{padding:'0.3em'}}>내용보기</div>}
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th colSpan="2"><span style={{color:'red'}}>필수</span></th>
                                <td colSpan="5">민감정보 및 고유식별정보의 처리</td>
                                <td colSpan="2">
                                    <div style={{color:'white',backgroundColor:'rgb(71,83,97)',font:'0.8em helvetica',}} onClick={()=>{this.props.setAgreePage(!this.props.agreePage,4)}}>
                                        {this.props.pid ? <div style={{padding:'0.3em',backgroundColor:'rgb(48,173,126)'}}>완료</div>: <div style={{padding:'0.3em'}}>내용보기</div>}
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{marginTop:'2em'}}>
                    <div style={{display:'flex',flexDirection:'column',justifyContent:'center',alignItems:'center'}}>
                        <div style={{width:'95%',marginLeft:'1em',textAlign:'left'}}><strong>고객정보</strong></div>
                        <label style={{width:'95%',}}>
                            <div style={{display:'flex',border:'1px solid rgb(233,233,233)',width:'95%'}}>
                                    <span
                                    style={{
                                        flex:3,
                                        backgroundColor: 'rgb(241, 241, 241)',
                                        textAlign: 'center',
                                        padding:'0.5em 0em 0.5em 0em',
                                    }}><strong>휴대폰</strong></span>
                                    <input 
                                        className='inputStyles' 
                                        style={{flex:5}} 
                                        type='number'
                                        pattern="[0-9]*"
                                        value={this.props.phoneNum}
                                        onChange={e=>this.props.setPhoneNum(e.target.value)}
                                    />
                            </div>
                        </label>

                        <label style={{width:'95%',}}>
                            <div style={{display:'flex',border:'1px solid rgb(233,233,233)',width:'95%',}}>
                                        <span
                                        style={{
                                            flex:3,
                                            backgroundColor: 'rgb(241, 241, 241)',
                                            textAlign: 'center',
                                            padding:'0.5em 0em 0.5em 0em',
                                        }}
                                        ><strong>이메일</strong></span>
                                        <input
                                            type='email'
                                            name = 'email'
                                            className = 'inputStyles'
                                            style={{flex:5}}
                                            value={this.props.email}
                                            onChange={e=>this.props.setEmail(e.target.value)}
                                        />
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
    else{
        switch(this.props.pageNum){
            case 1:
                return <CreditAgree/>
            case 2:
                return <LookUpAgree/>
            case 3:
                return <ServeAgree/>
            case 4:
                return <InfoAgree/>
            default:
                return <div>error</div>
        }
    }
}
}

let stateToProps = (state) => {
    return {
        email: state.reducer.email,
        phoneNum: state.reducer.phoneNum,
        agreePage: state.reducer.agreePage,
        pageNum: state.reducer.pageNum,
        collect: state.reducer.collect,
        lookUp: state.reducer.lookUp,
        credit: state.reducer.credit,
        disease: state.reducer.disease,
        pid: state.reducer.pid,
    };
}

let dispatchToProps = (dispatch) => {
    return {
        setEmail: email => dispatch(setEmail(email)),
        setPhoneNum: phoneNum => dispatch(setPhoneNum(phoneNum)),
        setAgreePage: (agreePage,pageNum) => dispatch(setAgreePage(agreePage,pageNum)),
    }
}

AgreePage = connect(stateToProps, dispatchToProps)(AgreePage);

export default AgreePage;