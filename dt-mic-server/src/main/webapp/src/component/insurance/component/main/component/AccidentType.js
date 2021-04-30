import React from 'react';
import {setDate, setPID} from 'action/action';
import {connect} from 'react-redux';
import CheckBox from 'component/common/CheckBox';

class AccidentType extends React.Component{
    render(){
        return(
            <div style={{width:'100%',height:'100%'}}>
                <div style={{marginTop:'1.5em'}}>
                    <table className='commonTable'>
                        <caption style={{textAlign:'left'}}><strong>본인과 치료받으신 분과의 관계</strong></caption>
                        <tbody>
                        <tr>
                            <td><CheckBox title='계약자' name='relationship' value='계약자'/></td>
                            <td><CheckBox title='친권자' name='relationship' value='친권자'/></td>
                            <td><CheckBox title='본인(피보험자)' name='relationship' value='본인'/></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{marginTop:'1.5em'}}>
                    <div><strong>치료받으신 분(피보험자) 주민등록번호</strong></div>
                    <div className='divTable'>
                        <label className='labelStyle'>
                            <span><strong>주민등록번호</strong></span>
                            <input onChange={e=>this.props.setPID(e.target.value)} className='inpuStyles' pattern="[0-9]*" maxLength='13' size='15' type='password' inputMode='numeric' value={this.props.pidNum}/>
                        </label>
                    </div>
                </div>
                <div style={{marginTop:'1.5em'}}>
                    <table className='commonTable'>
                        <caption style={{textAlign:'left'}}><strong>사고유형 선택</strong></caption>
                        <tbody>
                        <tr>
                            <td><CheckBox title='질병' name="accident" value='질병'/></td>
                            <td><CheckBox title='상해' name="accident" value='상해'/></td>
                            <td><CheckBox title='교통사고' name="accident" value='교통사고'/></td>
                            <td><CheckBox title='휴대품손해' name="accident" value='휴대품손해'/></td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div style={{marginTop:'1.5em'}}>
                    <table className='commonTable'>
                        <tbody>
                        <tr>
                            <th rowSpan="2">
                                <label htmlFor='date'>
                                    <div>발병일</div>
                                    <div>(사고일자)</div>
                                </label>
                            </th>
                            <td colSpan="2">
                                <input onChange={e=>this.props.setDate(e.target.value)} type='date' id='date' value={this.props.date}/>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan="2" style={{font:'0.5em helvetica'}}>*일자를 선택해 주시기 바랍니다.</td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

let stateToProps = (state) => {
    return {
        date: state.reducer.date,
        pidNum : state.reducer.pidNum,
    };
}

let dispatchToProps = (dispatch) => {
    return {
        setDate: date => dispatch(setDate(date)),
        setPID: pidNum => dispatch(setPID(pidNum)),
    }
}

AccidentType = connect(stateToProps, dispatchToProps)(AccidentType);

export default AccidentType;