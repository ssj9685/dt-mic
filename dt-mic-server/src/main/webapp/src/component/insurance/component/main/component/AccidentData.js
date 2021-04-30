import React from 'react';
import {connect} from 'react-redux';
import CheckBox from 'component/common/CheckBox';
import {setHospitalName,setAccidentData} from 'action/action';

class AccidentData extends React.Component{
    render(){
        return(
            <div style={{width:'100%'}}>
                <table className='commonTable'>
                    <caption style={{textAlign:'left'}}><strong>사고내역 입력</strong></caption>
                    <tbody>
                    <tr>
                        <th>사고일시</th>
                        <td colSpan="2">
                            {this.props.date}
                        </td>
                    </tr>
                    <tr>
                        <th>
                            <div>의료급여</div>
                            <div>수급권자</div>
                            <div>여부</div>
                        </th>
                        <td colSpan="2" style={{width:'100%',display:'flex',justifyContent:'space-around',}}>
                            <CheckBox title='예' name='benefit' value="yes"/>
                            <CheckBox title='아니오' name='benefit' value="no"/>
                        </td>
                    </tr>
                    <tr>
                        <th>치료병원</th>
                        <td colSpan="2">
                            <input onChange={e=>{
                                this.props.setHospitalName(e.target.value)
                                }} style={{width:'90%'}} type='text' maxLength='50' placeholder='50자 이내로 입력' value={this.props.hospitalName}/>
                        </td>
                    </tr>
                    <tr>
                        <th>사고내용</th>
                        <td colSpan="2">
                            <textarea onChange={e=>{this.props.setAccidentData(e.target.value)}} style={{height:'8em',width:'90%',}} placeholder='아픈 곳 진단명을 정확히 기재해주시면 심사가 신속히 진행됩니다.' value={this.props.accidentData}>

                            </textarea>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        )
    }
}

let stateToProps = (state) => {
    return {
        date: state.reducer.date,
        hospitalName: state.reducer.hospitalName,
        accidentData: state.reducer.accidentData,
    };
}

let dispatchToProps = (dispatch) => {
    return {
        setHospitalName: name => dispatch(setHospitalName(name)),
        setAccidentData: data => dispatch(setAccidentData(data)),
    }
}

AccidentData = connect(stateToProps,dispatchToProps)(AccidentData);

export default AccidentData;