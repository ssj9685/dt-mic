import React from 'react';
import { agreeCollect, agreeLookUp, agreeCredit, agreeDisease, agreePID} from 'action/action';
import {connect} from 'react-redux';

class Agree extends React.Component{
    render(){
        return(
            <div style={{height:'100%',width:'100%',font:"1em helvetica",display:'flex',flexDirection:'column',}}>
                <div>
                    <details style={{margin:"1em",}}>
                        <summary style={{outline:'none',fontWeight:"bold",}}>개인(신용)정보의 수집 이용에 관한 사항</summary>
                                <div style={{height:'24em',overflow:'auto'}}>

                                <p style={{fontWeight:'bold'}}>개인(신용)정보의 수집·이용 목적</p>
                                <p>
                                - 보험금지급·심사(보험금청구서류 접수대행 서비스 포함) 및 보험사고 조사(보험사기 조사 포함),
                                손해사정서 교부, 보험계약 유지·관리, 고객이력관리, 증빙서류보존, 보험금 지급관련 민원처리 및 분쟁대응
                                </p>
                                <p>- 금융거래(보험료 및 보험금 등 출·수납을 위한 금융거래 신청, 자동이체 등 접수)관련 업무</p>
                                <p>- 보험금지급·심사 고객만족도 등 안내자료(모니터링 포함)발송</p>

                                <p style={{fontWeight:'bold'}}>수집·이용할 개인(신용)정보의 내용</p>
                                <p>
                                - 개인식별정보(성명, 주민등록번호, 외국인등록번호, 운전면허증번호, 주소, 전화번호, 전자우편주소 등),
                                계좌정보, 보험계약정보 및 보험금지급정보(사고정보 포함)
                                </p>
                                <p>
                                - 보험금사고 조사(보험사기 조사 포함) 및 손해사정업무 수행과 관련하여 취득한 개인(신용)정보
                                [경찰, 공공기관, 의료기관 등으로부터 본인의 위임을 받아 취득한 각종 조사서, 증명서, 진료기록 등에 포함된 개인(신용)정보 포함]
                                </p>

                                <p style={{fontWeight:'bold'}}>개인(신용)정보의 보유·이용 기간</p>
                                <p>
                                - 수집·이용 동의일로부터 거래종료 후 5년까지
                                (단, 거래종류 후 5년이 경과한 후에는 보험금 지급, 금융사고 조사, 보험사기 방지·적발, 민원처리, 법령상
                                의무이행을 위한 경우에 한하여 보유·이용하며, 별도보관)
                                </p>

                                <p>
                                ※거래 종료일은 보험계약 만기, 해지, 취소, 철회일 또는 소멸일, 보험금 청구건 소멸시효 완성일, 채무·채권 소멸일 중
                                가장 나중에 도래한 사유를 기준으로 거래종료일을 판단함.
                                다만, 만기 등 사유발생일 이후라도 만기환급금 또는 해지환급금 등을 수령하지 않았거나 상환할 금액이 남아 있는 경우 및
                                보험금지급이 진행중이거나 수사·소송이 진행 중인 경우 제외(이하 동일)
                                </p>
                                </div>
                    </details>
                    <div style={{textAlign:"right"}}>
                        <label htmlFor='agree1'>동의</label>
                        <input
                            type="checkbox"
                            id='agree1'
                            checked={this.props.collect}
                            onChange={e=>this.props.agreeCollect(e.target.checked)}
                        />
                    </div>
                </div>

                <div>
                <details style={{margin:"1em",}}>
                    <summary style={{outline:'none',fontWeight:'bold',}}>개인(신용)정보 조회에 관한 사항</summary>
                        <div style={{fontFamily:'helvetica',height:'16em',overflow:'auto'}}>
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
                </details>

                <div style={{textAlign:"right"}}>
                    <label htmlFor='agree2'>동의</label>
                    <input 
                        type="checkbox"
                        id="agree2"
                        checked={this.props.lookUp}
                        onChange={e=>this.props.agreeLookUp(e.target.checked)}
                    />
                </div>
                </div>

                <div>
                    <details style={{margin:"1em",}}>
                        <summary style={{outline:'none',fontWeight:'bold'}}>개인(신용)정보의 제공에 관한 사항</summary>
                            <div style={{fontFamily:'helvetica',height:'16em',overflow:'auto'}}>

                                    <p style={{fontWeight:'bold'}}>개인(신용)정보를 제공받는 자(제 3 자)</p>
                                    <p>
                                        - 신용정보집중기관 : 한국신용정보원 등 신용정보집중기관
                                    </p>
                                    <p>
                                        - 공공기관 등 : 금융위원회, 국토해양부, 금융감독원, 보험요율산출기관, 국민건강보험공단, 관할 보건소,
                                        건강보험심사평가원 등 공공기관, 법원, 검찰, 국세청, 경찰청 등 법령상 업무 수행기관(위탁사업자 포함) 등
                                        - 보험회사 등 : 생명보험사, 손해보험사, 국내·국외 재보험사, 공제사업자, 체신관서(우체국보험), 금융거래 관련
                                        계좌개설 금융기관, 금융결제원 등
                                    </p>
                                    <p>
                                        - 업무수탁자 등 : 보험금지급·심사 및 보험사고조사 등에 필요한 업무를 위탁받은 자 [삼성화재 자회사 및 
                                        간이심사제에 따라 삼성화재로부터 지급심사 및 사고조사를 위탁받은 협력법인·보험사고 조사업체·손해사정업체,
                                        의료기관(의사), 법무법인(변호사)a, 위탁 콜센터, 추심업체, 잔존물 매각업체], 손해보험협회, 건강보험심사평가원 등
                                    </p>

                                    <p style={{fontWeight:'bold'}}>개인(신용)정보를 제공받는 자의 이용목적</p>
                                    <p>
                                        - 신용정보집중기관 : 보험계약 및 보험금지급 관련 정보의 집중관리 및 활용 등 신용정보집중기관의 업무
                                    </p>
                                    <p>
                                        - 공공기관 등 : 보험업법, 의료법, 국민건강보험법, 보험사기방지특별법, 자동차손해배상보장법 및
                                          도로교통법(자동차보험에 한함) 등 법령에 따른 업무수행(위탁업무 포함)
                                    </p>
                                    <p>
                                        - 보험회사 등: 보험사고조사(보험사기 조사 포함) 및 손해사정서비스 등 계약 이행에 필요한 업무, 보험금청구서류
                                          접수대행 서비스, 진료비심사, 의료심사 및 자문, 구상 관련 업무(자동차보험에 한함), 재보험 청구
                                    </p>
                                    <p>
                                        - 업무수탁자 등 : 보보험금지급·심사 및 보험사고조사 등에 필요한 업무 (손해사정 업무, 자동차사고
                                          과실비율분쟁심의업무, 구상업무 등)
                                    </p>
                                    <p>
                                        - 금융거래 업무(보험료 및 보험금 등 출·수납)
                                    </p>

                                    <p style={{fontWeight:'bold'}}>제공할 개인(신용)정보의 내용</p>
                                    <p>- 「1. 개인(신용)정보의 수집·이용에 관한 사항」의 정보내용(단, 각 제공받는 자의 이용 목적을 위해 필요한 정보에 한함)
                                         제공받는 자의 개인(신용)정보 보유 · 이용기간
                                    </p>
                                    <p>- 개인(신용)정보를 제공받는 자의 이용목적을 달성할 때까지로 (최대 거래종료 후 5 년까지)</p>
                                    <p>- 거래종료일 : 보험(대출)계약 만기, 해지, 취소, 철회일 또는 소멸일 및 보험금 청구권 소멸시효 완성일, 각종 채권·
                                    채무관계 소멸일 중 가장 나중에 도래한 사유를 기준으로 판단합니다.</p>
                            </div>
                    </details>

                    <div style={{textAlign:"right"}}>
                        <label htmlFor='agree3'>동의</label>
                        <input 
                            type="checkbox"
                            id="agree3"
                            checked={this.props.credit}
                            onChange={e=>this.props.agreeCredit(e.target.checked)}
                        />
                    </div>
                </div>

                <div>
                    <details style={{margin:"1em",}}>
                        <summary style={{outline:'none',fontWeight:'bold'}}>민감정보 및 고유식별정보의 처리에 관한 사항</summary>
                            <div style={{fontFamily:'helvetica',height:'16em',overflow:'auto'}}>
                                <p>당사 및 당사 업무수탁자는 「개인정보보호법」 및 「신용정보의 이용 및 보호에 관한
                                법률」에 따라 상기의 개인(신용)정보에 대한 개별 동의사항에 대하여 다음과 같이 귀하의
                                민감정보(질병·상해정보) 및 고유식별정보
                                (주민등록번호·외국인등록번호·운전면허번호)를 처리(수집·이용·조회·제공)하고자 합니다.
                                이에 동의하십니까?</p>
                            </div>
                            <div style={{textAlign:"right"}}>
                            <label htmlFor='agree4'>질병 상해정보 처리 동의</label>
                            <input 
                                type="checkbox"
                                id="agree4"
                                checked={this.props.disease}
                                onChange={e=>this.props.agreeDisease(e.target.checked)}
                            />
                            </div>
                            <div style={{textAlign:"right"}}>
                                <label htmlFor='agree5'>주민등록·외국인등록·운전면허 번호 처리 동의</label>
                                <input 
                                    type="checkbox"
                                    id="agree5"
                                    checked={this.props.pid}
                                    onChange={e=>this.props.agreePID(e.target.checked)}
                                />
                            </div>
                    </details>
                </div>
                <div style={{textAlign:"right"}}>
                        <label htmlFor='agree6'>전체 동의</label>
                        <input 
                            type="checkbox"
                            id="agree6"
                            checked={this.props.all}
                            onChange={e=>this.props.agreeAll(e.target.checked)}
                        />
                </div>
            </div>
        );
    }
}

let stateToProps = (state) => {
    return {
        collect: state.reducer.collect,
        lookUp: state.reducer.lookUp,
        credit: state.reducer.credit,
        disease: state.reducer.disease,
        pid: state.reducer.pid,
    };
}

let dispatchToProps = (dispatch) => {
    return {
        agreeCollect: collect => dispatch(agreeCollect(collect)),
        agreeLookUp: lookUp => dispatch(agreeLookUp(lookUp)),
        agreeCredit: credit => dispatch(agreeCredit(credit)),
        agreeDisease: disease => dispatch(agreeDisease(disease)),
        agreePID: pid => dispatch(agreePID(pid)),
    }
}

Agree = connect(stateToProps, dispatchToProps)(Agree);

export default Agree;