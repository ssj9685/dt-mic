import React from 'react';
import {setBank, setAccount, setName, setCompany, setBenefit} from 'action/action';
import {connect} from 'react-redux';

class Bank extends React.Component{
    render(){
        return(
            <div style={{height:'100%',width:'95%',display:'flex',justifyContent:'center',alignItems:'center',flexDirection:'column',}}>
                        <label className='labelStyle'>
                            <span><strong>수익자</strong></span>
                            <input
                                type='text'
                                value={this.props.beneficiary}
                                onChange={e=>this.props.setBenefit(e.target.value)}
                                className='inputStyles'
                            />
                        </label >
                        <label className='labelStyle'>
                            <span><strong>예금주</strong></span>
                            <input
                                type='text'
                                className = 'inputStyles'
                                value={this.props.name}
                                onChange={e=>this.props.setName(e.target.value)} 
                            />
                        </label>
                        <label className='labelStyle'>
                            <span><strong>은행명</strong></span>
                                <select 
                                    className = 'inputStyles'
                                    onChange={e=>this.props.setBank(e.target.value)}
                                    defaultValue={this.props.bank}
                                >
                                    <option value=''>은행 선택</option>
                                    <option value='kb'>국민은행</option>
                                    <option value='nh'>농협은행</option>
                                    <option value='kakao'>카카오뱅크</option>
                                </select>
                        </label>
                        <label className='labelStyle'>
                            <span><strong>계좌번호</strong></span>
                                <input 
                                    type='number'
                                    pattern="[0-9]*"
                                    className = 'inputStyles'
                                    value={this.props.account} 
                                    onChange={e=>this.props.setAccount(e.target.value)} 
                                />
                        </label>
                        <label className='labelStyle'>
                            <span><strong>보험사</strong></span>
                                <select
                                    className = 'inputStyles'
                                    onChange={e=>this.props.setCompany(e.target.value)}
                                    defaultValue={this.props.company}
                                >
                                    <option value=''>보험사 선택</option>
                                    <option value='samsung'>삼성화재</option>
                                    <option value='db'>DB손해보험</option>
                                    <option value='hanhwa'>한화생명</option>
                                </select>
                        </label>
            </div>
        );
    }
}

let stateToProps = (state) => {
    return {
        company: state.reducer.company,
        bank: state.reducer.bank,
        account: state.reducer.account,
        name: state.reducer.name,
        beneficiary: state.reducer.beneficiary,
    };
}

let dispatchToProps = (dispatch) => {
    return {
        setCompany: company => dispatch(setCompany(company)),
        setBank: bank => dispatch(setBank(bank)),
        setAccount: account => dispatch(setAccount(account)),
        setName: name => dispatch(setName(name)),
        setBenefit: beneficiary => dispatch(setBenefit(beneficiary)),
    }
}

Bank = connect(stateToProps, dispatchToProps)(Bank);

export default Bank;