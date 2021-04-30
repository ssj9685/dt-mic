import React from 'react';
import checkedImg from 'resource/checked.png';
import {setChecked} from 'action/action';
import {connect} from 'react-redux';

class CheckBox extends React.Component{
    constructor(props){
        super(props);
        this.input = React.createRef();
        this.checkfunc = this.checkfunc.bind(this);
    }
    componentDidMount(){
        if(Object.keys(this.props.checked).length){
            this.checkfunc('division');
            this.checkfunc('search');
            this.checkfunc('relationship');
            this.checkfunc('accident');
            this.checkfunc('benefit');
        }
    }
    checkfunc(s){
        if(this.input.current.name===s && this.input.current.value === this.props.checked[s]){
            this.input.current.checked = true;
        }
    }
    render(){
        return(
            <div className='radioDiv'>
                <label>
                    <input ref={this.input} type='radio' style={{display:"none"}} name={this.props.name} value={this.props.value} onChange={e=>this.props.setChecked(e.target.name,e.target.value)}/>
                    <img style={{width:'24px',height:'24px',objectFit:"contain"}} src={checkedImg} alt='check'/>
                    <div><strong>{this.props.title}</strong></div>
                </label>
            </div>
        )
    }
}
let stateToProps = (state) => {
    return {
        checked: state.reducer.checked,
    };
}

let dispatchToProps = (dispatch) => {
    return {
        setChecked: (name,value) => dispatch(setChecked(name,value)),
    }
}

CheckBox = connect(stateToProps, dispatchToProps)(CheckBox);

export default CheckBox;