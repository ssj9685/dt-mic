import React from 'react';
import checkedImg from 'resource/checked.png';
import {nextPage,setAgreePage,agreeCollect,agreeLookUp,agreeCredit,agreeDisease,agreePID } from 'action/action';
import {connect} from 'react-redux';

class Footer extends React.Component{
    render(){
        switch(this.props.page){
            case 1:
                return(
                    <div className="redFooter" onClick={e=>{this.props.next()}}>
                        <p width='100%'><strong>확인</strong></p>   
                    </div>
                );
            case 2:
                return(
                    <div className="Footer" onClick={e=>{
                        if(this.props.checked['division']===undefined||this.props.checked['search']===undefined){
                            alert("모든 항목에 체크해주세요.")
                        }
                        else{
                            this.props.next()
                        }
                    }}>
                        <p width='100%'><strong>다음 단계</strong></p>
                    </div>
                );
            case 3:
                if(!this.props.agreePage){
                    return(
                        <div className="Footer" onClick={e=>{
                            if(this.props.collect===false || this.props.lookUp===false||this.props.credit===false||this.props.disease===false){
                                alert("개인정보제공에 모두 동의하여 주세요.")
                            }
                            else if(this.props.phoneNum===''||this.props.email===''){
                                alert("휴대전화 번호와 이메일을 입력해주세요.")
                            }
                            else{
                                this.props.next()
                            }
                        }}>
                            <p width='100%'><strong>다음 단계</strong></p>
                        </div>
                    );
                }
                else{
                    return(
                        <div className="Footer" onClick={()=>{
                            switch(this.props.pageNum){
                                case 1:
                                    this.props.agreeCollect(true);
                                    break;
                                case 2:
                                    this.props.agreeLookUp(true);
                                    break;
                                case 3:
                                    this.props.agreeCredit(true);
                                    break;
                                case 4:
                                    this.props.agreeDisease(true);
                                    this.props.agreePID(true);
                                    break;
                                default:
                                    this.props.agreeCollect(false);
                            }
                            this.props.setAgreePage(!this.props.agreePage,null);
                        }}>
                            <img style={{widht:'1.3em',height:'1.3em',marginRight:'0.7em',objectFit:'contain'}} src={checkedImg} alt='img'/>
                            <div width='100%'>
                                <strong>모든 내용을 읽고 확인했습니다.</strong>
                            </div>
                        </div>
                    )
                }
            case 4:
                return(
                    <div className="Footer" onClick={e=>{
                        if(this.props.checked['relationship']===undefined||this.props.checked['accident']===undefined){
                            alert("모든 항목에 체크해주세요.")
                        }
                        else if(this.props.pidNum===''){
                            alert("주민등록번호를 입력해주세요.")
                        }
                        else if(this.props.date===''){
                            alert("사고일자를 입력해주세요.")
                        }
                        else{
                            this.props.next()
                        }
                    }}>
                        <p width='100%'><strong>다음 단계</strong></p>
                    </div>
                );
            case 5:
                return(
                    <div className="Footer" onClick={e=>{
                        if(this.props.checked['benefit']===undefined){
                            alert("의료 수급권자 여부에 체크해주세요.")
                        }
                        else if(this.props.hospitalName===''){
                            alert("병원명을 입력해주세요.")
                        }
                        else if(this.props.accidentData===''){
                            alert("사고 내용을 입력해주세요.")
                        }
                        else{
                            this.props.next()
                        }
                    }}>
                        <p width='100%'><strong>다음 단계</strong></p>
                    </div>
                );
            case 6:
                return(
                    <div className="Footer" onClick={e=>{
                        if(this.props.benefit===''||this.props.name===''||this.props.bank===''||this.props.account===''||this.props.company===''){
                            alert("모든 항목을 채워주세요.")
                        }
                        else{
                            this.props.next()
                        }
                    }}>
                        <p width='100%'><strong>다음 단계</strong></p>
                    </div>
                );
            case 8:
                return(
                    <div className="Footer" onClick={e=>{
                        if(this.props.sign===''){
                            alert("사인을 해주세요.")
                        }
                        else{
                            this.props.next()
                        }
                    }}>
                        <p width='100%'><strong>다음 단계</strong></p>
                    </div>
                );
            case 10:
                return(
                    <div className="redFooter" onClick={this.props.next}>
                        <p width='100%'><strong>확인</strong></p>
                    </div>
                );
            default:
                return(
                    <div className="Footer" onClick={this.props.next}>
                        <p width='100%'><strong>다음 단계</strong></p>
                    </div>
                );
        }
    }
}

let stateToProps = (state) => {
    return {
        page: state.reducer.page,
        agreePage: state.reducer.agreePage,
        pageNum: state.reducer.pageNum,
        checked: state.reducer.checked,
        collect: state.reducer.collect,
        lookUp: state.reducer.lookUp,
        credit: state.reducer.credit,
        disease: state.reducer.disease,
        pid: state.reducer.pid,
        phoneNum: state.reducer.phoneNum,
        email: state.reducer.email,
        pidNum: state.reducer.pidNum,
        date: state.reducer.date,
        hospitalName: state.reducer.hospitalName,
        accidentData: state.reducer.accidentData,
        benefit: state.reducer.benefit,
        name: state.reducer.name,
        bank: state.reducer.bank,
        account: state.reducer.account,
        company: state.reducer.company,
        sign: state.reducer.sign,
    };
}

let dispatchToProps = (dispatch) => {
    return {
        next: () => dispatch(nextPage()),
        setAgreePage: (agreePage) => dispatch(setAgreePage(agreePage)),
        agreeCollect: collect => dispatch(agreeCollect(collect)),
        agreeLookUp: lookUp => dispatch(agreeLookUp(lookUp)),
        agreeCredit: credit => dispatch(agreeCredit(credit)),
        agreeDisease: disease => dispatch(agreeDisease(disease)),
        agreePID: pid => dispatch(agreePID(pid)),
    }
}

Footer = connect(stateToProps, dispatchToProps)(Footer);

export default Footer;