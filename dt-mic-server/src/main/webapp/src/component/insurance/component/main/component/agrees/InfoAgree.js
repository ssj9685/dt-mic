import React from 'react';

class LookUpAgree extends React.Component{
    render(){
        return(
            <div style={{height:'100%',width:'100%',font:"1em helvetica",display:'flex',flexDirection:'column',}}>
                <div style={{marginTop:'1em',fontWeight:"bold",}}>민감정보 및 고유식별정보의 처리에 관한 사항</div>
                <div style={{overflow:'auto'}}>
                                <p>당사 및 당사 업무수탁자는 「개인정보보호법」 및 「신용정보의 이용 및 보호에 관한
                                법률」에 따라 상기의 개인(신용)정보에 대한 개별 동의사항에 대하여 다음과 같이 귀하의
                                민감정보(질병·상해정보) 및 고유식별정보
                                (주민등록번호·외국인등록번호·운전면허번호)를 처리(수집·이용·조회·제공)하고자 합니다.
                                이에 동의하십니까?</p>
                            </div>
            </div>
        );
    }
}

export default LookUpAgree;