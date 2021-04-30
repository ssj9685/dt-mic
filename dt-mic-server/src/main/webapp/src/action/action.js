// action type
const SET_COMPANY = 'SET_COMPANY';
const SET_BANK = 'SET_BANK';
const SET_ACCOUNT = 'SET_ACCOUNT';
const SET_NAME = 'SET_NAME';
const SET_EMAIL = 'SET_EMAIL';
const SET_HOSPITAL_NAME = 'SET_HOSPITAL_NAME';
const SET_PERSONAL_ID = 'SET_PERSONAL_ID';
const SET_DISEASE_NUMBER = 'SET_DISEASE_NUMBER'
const NEXT_PAGE = 'NEXT_PAGE';
const PREV_PAGE = 'PREVIOUS_PAGE';
const SET_SIGN = 'SET_SIGN';
const SET_PERMISSION = 'SET_PERMISSION';
const AGREE_COLLECT = 'AGREE_COLLECT';
const AGREE_LOOKUP = 'AGREE_LOOKUP';
const AGREE_CREDIT = 'AGREE_CREDIT';
const AGREE_DISEASE = 'AGREE_DISEASE';
const AGREE_PID = 'AGREE_PID';
const SET_COMPLETESRC = 'SET_COMPLETESRC';
const SET_COMPLETEHISTROY = 'SET_COMPLETEHISTORY';
const SET_RECEIPT = 'SET_RECEIPT';
const SET_UUID = 'SET_UUID';
const SET_DATE = 'SET_DATE';
const SET_PID = 'SET_PID';
const SET_CHECKED = 'SET_CHECKED';
const SET_PHONENUM = 'SET_PHONENUM';
const SET_AGREEPAGE = 'SET_AGREEPAGE';
const SET_ACCIDENTDATA = 'SET_ACCIDENTDATA';
const SET_BENEFIT = 'SET_BENEFIT';
//const SET_FILE = 'SET_FILE';


// action creators
const setCompany = company => {
	return { type: SET_COMPANY, company }
}

const setBank = bank => {
    return { type: SET_BANK, bank};
}

const setAccount = account => {
    return { type: SET_ACCOUNT, account};
}

const setName = name => {
    return { type: SET_NAME, name};
}

const setEmail = email => {
	return {type:SET_EMAIL,email}
}

const setHospitalName = name => {
	return {type:SET_HOSPITAL_NAME,name}
}

const setPersonalID = id => {
	return {type:SET_PERSONAL_ID,id}
}

const setDiseaseNumber = number => {
	return {type:SET_DISEASE_NUMBER,number}
}

const setSign = sign => {
	return { type: SET_SIGN, sign};
}

const setPermission = permission => {
	return { type: SET_PERMISSION, permission};
}

const agreeCollect = agree => {
	return { type:AGREE_COLLECT,agree}
}

const agreeLookUp = agree => {
	return { type:AGREE_LOOKUP,agree}
}

const agreeCredit = agree => {
	return { type:AGREE_CREDIT,agree}
}

const agreeDisease = agree => {
	return { type:AGREE_DISEASE, agree}
}

const agreePID = agree => {
	return { type:AGREE_PID, agree}
}

function nextPage(){
	return { type: NEXT_PAGE}
}

function prevPage(){
	return { type: PREV_PAGE}
}

const setCompleteSrc = src => {
	return { type: SET_COMPLETESRC, src}
}

const setCompleteHistory = data => {
	return { type: SET_COMPLETEHISTROY, data}
}

const setReceipt = img => {
	return { type: SET_RECEIPT, img}
}

const setUUID = uuid => {
	return { type:SET_UUID, uuid}
}

const setDate = date =>{
	return { type:SET_DATE, date}
}

const setPID = pid => {
	return { type:SET_PID,pid}
}

const setChecked = (name,value) => {
	return {type:SET_CHECKED,name,value}
}

const setPhoneNum = (phoneNum) => {
	return {type:SET_PHONENUM,phoneNum}
}

const setAgreePage = (agreePage,pageNum) => {
	return{type:SET_AGREEPAGE,agreePage,pageNum}
}

const setAccidentData = (data) => {
	return{type:SET_ACCIDENTDATA,data}
}

const setBenefit = (name) => {
	return{type:SET_BENEFIT,name}
}

export  {
	SET_COMPANY,
	SET_NAME,
	SET_ACCOUNT,
	SET_BANK,
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
	setCompany,
	setBank,
	setAccount,
	setName,
	setEmail,
	setHospitalName,
	setPersonalID,
	setDiseaseNumber,
	setSign,
	setPermission,
	nextPage,
	prevPage,
	agreeCollect,
	agreeLookUp,
	agreeCredit,
	agreeDisease,
	agreePID,
	setCompleteSrc,
	setCompleteHistory,
	setReceipt,
	setUUID,
	setDate,
	setPID,
	setChecked,
	setPhoneNum,
	setAgreePage,
	setAccidentData,
	setBenefit,
}