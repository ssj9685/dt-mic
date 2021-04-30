import React from 'react';
import 'index.css'
import { BackButton, PageTitle } from './component/Component';
import {connect} from 'react-redux';

class Header extends React.Component{
    render(){
        switch(this.props.page){
            case 1:
                return(
                    <div className="Header">
                        <BackButton/>
                        <PageTitle/>
                    </div>
                );
            case 10:
                return(
                    <div className="Header">
                        <BackButton/>
                        <PageTitle/>
                    </div>
                );
            default:
                return(
                    <div className="lightHeader">
                        <BackButton/>
                        <PageTitle/>
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

Header = connect(stateToProps)(Header);

export default Header;