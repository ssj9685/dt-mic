import React from 'react';
import {ClaimGuide, ClaimDivision, AgreePage, AccidentType, AccidentData, Sign, Bank, InfoComplete, DocInputPage, ClaimResult } from './component/Component';
import {connect} from 'react-redux';

class Main extends React.Component{
    render(){
        switch(this.props.page){
            case 1:
                return(
                    <div className='Main'>
                        <ClaimGuide/>
                    </div>
                );
            case 2:
                return(
                    <div className='Main'>
                        <ClaimDivision/>
                    </div>
                )
            case 3:
                return(
                    <div className='Main'>
                        <AgreePage/>
                    </div>
                );
            case 4:
                return(
                    <div className='Main'>
                        <AccidentType/>
                    </div>
                );
            case 5:
                return(
                    <div className='Main'>
                        <AccidentData/>
                    </div>
                );
            case 6:
                return(
                    <div className='Main'>
                        <Bank/>
                    </div>
                );
            case 7:
                return(
                    <div className='Main'>
                        <DocInputPage/>
                    </div>
                )
            case 8:
                return(
                    <div className='Main'>
                        <Sign/>
                    </div>
                );
            case 9:
                return(
                    <div className='Main'>
                        <InfoComplete/>
                    </div>
                )
            case 10:
                return(
                    <div className='Main'>
                        <ClaimResult/>
                    </div>
                )
            default:
                return(
                    <div className='Main'>
                        Main
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

Main = connect(stateToProps)(Main);

export default Main;