import React from 'react';
import Header from './component/header/Header';
import Footer from './component/footer/Footer';
import Main from './component/main/Main';
import 'index.css';

class Insurance extends React.Component{
  render(){
    return(
      <div className='App'>
        <Header/>
        <Main/>
        <Footer/>
      </div>
    );
  }
}

export default Insurance;