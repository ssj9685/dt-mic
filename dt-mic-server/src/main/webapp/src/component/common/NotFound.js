import React from 'react';

class NotFound extends React.Component{
    render(){
        return(
            <div style={{
                backgroundColor:'#255EE1',
                color:'white',
                height:'100%',
                display:'flex',
                justifyContent:'center',
                alignItems:'center',
                font:'normal bold 4em helvetica'
            }}>
                404 not found
            </div>
        )
    }
}

export default NotFound;