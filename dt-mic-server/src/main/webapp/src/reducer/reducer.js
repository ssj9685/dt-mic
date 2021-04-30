import actions from '../action/index';
import {combineReducers} from 'redux';

const totalPage = 10;

const {
        SET_COMPANY,
        SET_NAME,
        SET_BANK,
        SET_ACCOUNT,
        SET_EMAIL,
        SET_HOSPITAL_NAME,
        SET_PERSONAL_ID,
        SET_DISEASE_NUMBER,
        SET_SIGN,
        SET_PERMISSION,
        NEXT_PAGE,
        PREV_PAGE,
        AGREE_COLLECT,
        AGREE_LOOKUP,
        AGREE_CREDIT,
        AGREE_DISEASE,
        AGREE_PID,
        SET_COMPLETESRC,
        SET_COMPLETEHISTROY,
        SET_RECEIPT,
        SET_UUID,
        SET_DATE,
        SET_PID,
        SET_CHECKED,
        SET_PHONENUM,
        SET_AGREEPAGE,
        SET_ACCIDENTDATA,
        SET_BENEFIT,
    } = actions.action;

const initialState = {
    company:'',
    bank:'',
    account:'',
    name:'',
    email:'',
    hospitalName:'',
    personalID:'',
    diseaseNumber:'',
    page:1,
    sign:'',
    collect:false,
    lookUp:false,
    credit:false,
    disease:false,
    pid:false,
    permission: false,
    completeSrc:[],
    completeHistory:{},
    receipt:'',
    uuid:'',
    date:'',
    pidNum:'',
    checked: {},
    phoneNum: '',
    agreePage:false,
    pageNum: 0,
    accidentData:'',
    beneficiary:'',
}

const reducer = (state=initialState,action)=>{
    switch(action.type){
        case SET_COMPANY:
            return {
                ...state,
                company: action.company
            }
        case SET_BANK:
            return {
                ...state,
                bank: action.bank
            }
        case SET_ACCOUNT:
            return {
                ...state,
                account: action.account
            }
        case SET_NAME:
            return {
                ...state,
                name: action.name
            }
        case SET_EMAIL:
            return{
                ...state,
                email: action.email
            }
        case SET_HOSPITAL_NAME:
            return{
                ...state,
                hospitalName:action.name
            }
        case SET_PERSONAL_ID:
            return{
                ...state,
                personalID:action.id
            }
        case SET_DISEASE_NUMBER:
            return{
                ...state,
                diseaseNumber:action.number
            }
        case NEXT_PAGE:
            if(state.page < totalPage){
                return{
                    ...state,
                    page: state.page + 1
                }
            }
            else{return state;}
        case PREV_PAGE:
            if(state.page>1){
                return {
                    ...state,
                    page: state.page - 1
                };
            }
            else{return state;}
        case AGREE_COLLECT:
            return{
                ...state,
                collect:action.agree,
            }
        case AGREE_LOOKUP:
            return{
                ...state,
                lookUp:action.agree,
            }
            
        case AGREE_CREDIT:
            return{
                ...state,
                credit:action.agree,
            }
            
        case AGREE_DISEASE:
            return{
                ...state,
                disease:action.agree,
            }
            
        case AGREE_PID:
            return{
                ...state,
                pid:action.agree,
            }
            
        case SET_SIGN:
            return{
                ...state,
                sign:action.sign,
            }
        case SET_PERMISSION:
            return{
                ...state,
                permission:action.permission,
            }
        case SET_COMPLETESRC:
            return{
                ...state,
                completeSrc: action.src,
            }
        case SET_COMPLETEHISTROY:
            return{
                ...state,
                completeHistory:action.data,
            }
        case SET_RECEIPT:
            return{
                ...state,
                receipt: action.img,
            }
        case SET_UUID:
            return{
                ...state,
                uuid:action.uuid,
            }
        case SET_DATE:
            return{
                ...state,
                date:action.date,
            }
        case SET_PID:
            return{
                ...state,
                pidNum:action.pid,
            }
        case SET_CHECKED:
            return{
                ...state,
                checked: {...state.checked,[action.name]: action.value}
            }
        case SET_PHONENUM:
            return{
                ...state,
                phoneNum: action.phoneNum
            }
        case SET_AGREEPAGE:
            return{
                ...state,
                agreePage: action.agreePage,
                pageNum: action.pageNum,
            }
        case SET_ACCIDENTDATA:
            return{
                ...state,
                accidentData: action.data,
            }
        case SET_BENEFIT:
            return{
                ...state,
                beneficiary: action.name,
            }
        default:
            return state
    }
}


const reducers = combineReducers({
    reducer,
})

export default reducers;