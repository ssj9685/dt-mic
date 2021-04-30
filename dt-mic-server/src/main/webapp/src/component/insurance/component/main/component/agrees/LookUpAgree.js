import React from 'react';

class LookUpAgree extends React.Component{
    render(){
        return(
            <div style={{height:'100%',width:'100%',font:"1em helvetica",display:'flex',flexDirection:'column',}}>
                <div style={{marginTop:'1em',fontWeight:"bold",}}>개인(신용)정보 조회에 관한 사항</div>
                <div style={{overflow:'auto'}}>
                    <p style={{fontWeight:'bold'}}>개인(신용)정보 조회 목적</p>
                    <p>- 보험금지급·심사(보험금청구서류 접수대행 서비스 포함) 및 보험사고 조사(보험사기 조사 포함)</p>

                    <p style={{fontWeight:'bold'}}>조회할 개인(신용)정보</p>
                    <p>- 보험계약정보, 보험금지급 관련 정보(사고정보 포함), 질병 및 상해 관련 정보</p>

                    <p style={{fontWeight:'bold'}}>조회동의 유효 기간 및 조회자[개인(신용)정보를 제공받는 자]의 개인(신용)정보의 보유·이용 기간</p>
                    <p>
                        - 수집·이용 동의일로부터 거래종료 후 5년까지
                        (단, 거래종료 후 5년이 경과한 후에는 보험금 지급, 금융사고조사, 분쟁해결, 민원처리, 법령상 의무이행을 위한 경우에 한하여 보유·이용하며, 별도 보관함)
                    </p>
                </div>
            </div>
        );
    }
}

export default LookUpAgree;