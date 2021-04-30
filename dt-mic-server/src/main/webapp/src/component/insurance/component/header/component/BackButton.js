import React from 'react';
import {prevPage} from 'action/action';
import {connect} from 'react-redux';
import backArrow from 'resource/backArrow.png'

class BackButton extends React.Component{
    render(){
        switch(this.props.page){
            case 1:
                return <></>
            case 10:
                return <></>
            default:
                return(
                    <div className='backButton'>
                        <img onClick={this.props.prev} style={{width:'16px', height:'16px', padding:'1em', objectFit:'contain'}} src={backArrow} alt="backArrow"/>
                    </div>
                );
        }
    }
}

let stateToProps = (state) => {
    return {
        page: state.reducer.page,
    };
}

let dispatchToProps = (dispatch) => {
    return {
        prev: () => dispatch(prevPage())
    }
}

BackButton = connect(stateToProps, dispatchToProps)(BackButton);

export default BackButton;