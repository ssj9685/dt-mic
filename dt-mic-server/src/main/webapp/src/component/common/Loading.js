import React from 'react'
import 'index.css'

class Loading extends React.Component{
    render(){
        return(
            <>
            <div className='loader'></div>
            <div style={{font:'normal bold 15px helvetica'}}><p>문서를 처리중입니다.</p> <p>잠시만 기다려주세요.</p></div>
            </>
        )
    }
}

export default Loading;