import React from 'react';
import {setCompleteSrc, setCompleteHistory} from 'action/action';
import {connect} from 'react-redux';
import Loading from 'component/common/Loading'
import 'index.css'

class InfoComplete extends React.Component{
    componentDidMount(){
        this.data = {
            'sessionID':this.props.uuid,
            'company': this.props.company,
            'args':{
                'bankName':this.props.bank,
                'accountNumber':this.props.account,
                'bankOwner':this.props.name,
                'email':this.props.email,
                'signature':this.props.sign,
                'personalInfoCollectOk':this.props.collect,
                'PersonalInfoLookupOk':this.props.lookUp,
                'personalCreditOK':this.props.credit,
                'diseaseInjuryInfoProcessingOk': this.props.disease,
                'personalIDProcessingOk':this.props.pid,
                'hospitalName':this.props.hospitalName,
                'personalID': this.props.personalID,
                'claimDivision':this.props.checked['division'],
                'searchCondition':this.props.checked['search'],
                'relationship': this.props.checked['relationship'],
                'accidentType':this.props.checked['accident'],
                'benefit':this.props.checked['benefit'],
                'accidentData':this.props.accidentData,
                'name':this.props.name,
                'beneficiary':this.props.beneficiary,
                'phoneNum':this.props.phoneNum,
                'accidentDate':this.props.date,
            }
        };
        this.submitInfoComplete()
    }

    render(){
        if(this.props.completeSrc.length > 0){
            const imgs = this.props.completeSrc.map((src,i)=><img className='pdfImg' src={src} key={i} alt='info'/>)
            return (
                <div className='imgListBox'>
                    {imgs}
                </div>
            );
        }
        else{
            return(
                <div className='load'>
                    <Loading/>
                </div>
            );  
        }
    }
    dataParser(data){
        /*
        if(data['args']['relationship']==="계약자"){
            data['args']['relationshipContractor'] = "✔";
        }
        else if(data['args']['relationship']==="피보험자"){
            data['args']['relationshipInsured'] = "✔";
        }
        else if(data['args']['relationship']==="친권자"){
            data['args']['relationshipPerental'] = "✔";
        }
        else{
            alert(data['args']['relationship']);
            return;
        }
        */

        if(data['args']['benefit']==="yes"){
            data['args']['benefitYes'] = "V";
        }
        else if(data['args']['benefit']==="no"){
            data['args']['benefitNo'] = "V";
        }
        else{
            alert(data['args']['benefit']);
            return;
        }

        if(data['args']['accidentType']==="질병"){
            data['args']['accidentTypeDisease'] = "V"
        }
        else if(data['args']['accidentType']==="상해"){
            data['args']['accidentTypeDetriment'] = "V"
        }
        else if(data['args']['accidentType']==="교통사고"){
            data['args']['accidentTypeCar'] = "V";
        }
        else{
            alert('Do not exist');
            return;
        }

        if(data['args']['claimDivision']==="new"){
            data['args']['claimDivisionNew'] = "V";
        }
        else if(data['args']['claimDivision']==="add"){
            data['args']['claimDivisionAdd'] = "V";
        }
        else{
            alert('Do not exist');
            return;
        }

        return data;
    }
    async submitInfoComplete(){

        this.data = await this.dataParser(this.data)
        console.log(this.data['args']['personalID']);

        if(JSON.stringify(this.data)===JSON.stringify(this.props.completeHistory)){
            return;
        }
        else{
            this.props.setCompleteSrc([]);
        }

        fetch('https://lab.dja.kr/user/api/reqClaimDocComplete', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.data)
        })
        .then(res => res.json())
        .then(result => {
            //console.log(result);
            this.props.setCompleteSrc(result['docs']);
            this.props.setCompleteHistory(this.data)
        })
    }
}

let stateToProps = (state) => {
    return {
        company: state.reducer.company,
        bank: state.reducer.bank,
        account: state.reducer.account,
        name: state.reducer.name,
        email: state.reducer.email,
        sign: state.reducer.sign,
        collect: state.reducer.collect,
        lookUp: state.reducer.lookUp,
        credit: state.reducer.credit,
        disease: state.reducer.disease,
        pid: state.reducer.pid,
        all: state.reducer.all,
        completeSrc: state.reducer.completeSrc,
        completeHistory: state.reducer.completeHistory,
        uuid: state.reducer.uuid,
        checked:state.reducer.checked,
        accidentData:state.reducer.accidentData,
        personalID:state.reducer.pidNum,
        beneficiary:state.reducer.beneficiary,
        phoneNum:state.reducer.phoneNum,
        hospitalName:state.reducer.hospitalName,

    };
}

let dispatchToProps = (dispatch) => {
    return {
        setCompleteSrc: src => dispatch(setCompleteSrc(src)),
        setCompleteHistory: data => dispatch(setCompleteHistory(data)),
    }
}

InfoComplete = connect(stateToProps,dispatchToProps)(InfoComplete);

export default InfoComplete;