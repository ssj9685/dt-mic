import React from 'react';
import { connect } from 'react-redux';
import 'index.css'

const Title = (props)=>{
    switch(props.page){
        case 1:
            return(
                <div className='whiteTitle'>
                    <p><strong>{props.title}</strong></p>
                </div>
            );
        case 10:
            return(
                <div className='whiteTitle'>
                    <p><strong>{props.title}</strong></p>
                </div>
            );
        default:
            return(
                <div className='darkTitle'>
                    <p><strong>{props.title}</strong></p>
                </div>
            );
    }
}

class PageTitle extends React.Component{
    render(){
        switch(this.props.page){
            case 1:
                return <Title page={this.props.page} title='보험금 청구'/>
            case 2:
                return <Title page={this.props.page} title='보험금 청구'/>
            case 3:
                return <Title page={this.props.page} title='개인(신용)정보동의'/>
            case 4:
                return <Title page={this.props.page} title='사고유형 선택'/>
            case 5:
                return <Title page={this.props.page} title='청구내역입력'/>
            case 6:
                return <Title page={this.props.page} title='보험금지급계좌입력'/>
            case 7:
                return <Title page={this.props.page} title='구비서류확인'/>
            case 8:
                return <Title page={this.props.page} title='최종확인서명'/>
            case 9:
                return <Title page={this.props.page} title='최종문서확인'/>
            case 10:
                return <Title page={this.props.page} title='청구내역확인'/>
            default:
                return <Title page={this.props.page} title='main'/>
        }
    }
}

let stateToProps = (state) => {
    return {
        page: state.reducer.page
    };
}

PageTitle = connect(stateToProps)(PageTitle);

export default PageTitle;