import React from 'react';
import notSearchImg from 'resource/notSearchImg.png';
import 'index.css';
import CheckBox from 'component/common/CheckBox';

class ClaimDivision extends React.Component{
    render(){
        return(
            <div style={{height:'100%',}}>
                <div className="divisionTable">
                    <table>
                        <thead>
                        <tr>
                            <th colSpan="2">구분</th>
                            <th colSpan="4">내용</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <th colSpan="2">추가접수</th>
                            <td colSpan='3'>기존 청구와 동일한 사유로 접수하는 경우</td>
                            <td style={{padding:'0em',textAlign:'center'}}>
                                <CheckBox title='' name='division' value='add'/>
                            </td>
                        </tr>
                        <tr>
                            <th colSpan="2">신규접수</th>
                            <td colSpan='3'>새로운 질병/상해 사고로 접수하는 경우</td>
                            <td style={{padding:'0em',textAlign:'center'}}>
                                <CheckBox title='' name='division' value='new'/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="searchTable">
                    <table>
                    <caption style={{paddingLeft:'1em',textAlign:'left'}}><strong>조회조건선택</strong></caption>
                        <tbody>
                        <tr>
                            <th colSpan="11">조회대상</th>
                            <td colSpan="9">
                                <CheckBox title='계약자' name='search' value='계약자'/>
                            </td>
                            <td colSpan="9">
                                <CheckBox title='피보험자' name='search' value='피보험자'/>
                            </td>
                            <td colSpan="9">
                                <CheckBox title='친권자' name='search' value='친권자'/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div className='searchButton'>
                        <div><strong>조회</strong></div>
                    </div>
                </div>
                <div style={{margin:'2em 0em 2em 0em',flex:1, display:'flex',flexDirection:'column',alignItems:'center'}}>
                    <div style={{display:'flex',justifyContent:'center'}}>
                        <img className='notSearchImg' src={notSearchImg} alt='img'/>
                    </div>
                    <div>
                        조회내역이 없습니다.
                    </div>
                </div>
            </div>
        )
    }
}

export default ClaimDivision;