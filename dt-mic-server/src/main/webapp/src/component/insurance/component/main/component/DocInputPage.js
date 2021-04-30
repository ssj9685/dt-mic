import React from 'react';

class DocInputPage extends React.Component{
    constructor(props){
        super(props);
        this.handleAddFiles = this.handleAddFiles.bind(this);
        this.fileDiv = React.createRef();
    }
    render(){
        return(
            <div style={{height:'100%',}}>
                <div style={{backgroundColor:'rgb(242,242,230)',marginTop:'2em',padding:'1em', font:'0.8em helvetica'}}>
                    동일질병(상해)의 경우 최초치료일부터 최종치료일까지 영수증을 모두 등록해 주시기 바랍니다.
                </div>

                <div style={{
                    height:'2.5em',
                    marginTop:'2em',
                    border:'1px solid rgb(233,233,233)',
                    borderRadius:'1em',
                    display:'flex',
                    justifyContent:'space-between',
                    alignItems:'center'
                    }}>
                    <span style={{marginLeft:'1em'}}>청구내역확인</span>
                    <span><div style={{
                        color:'white',
                        backgroundColor:'rgb(71,83,97)',
                        font:'0.8em helvetica',
                        marginRight:'1em',
                        padding:'0.5em 0.8em 0.5em 0.8em',
                        borderRadius:'10px'
                        }}>
                        조회하기
                    </div></span>
                </div>

                <div style={{margin:'1em 0.25em 0.25em 0.25em',border:'1px solid rgb(176,184,190)'}}>
                    <div ref={this.fileDiv} style={{
                        height:'12em',
                        display:'flex',
                        flexDirection:'column',
                        alignItems:'center',
                        overflow:'auto'
                        }}>
                            <div style={{
                                width:'100%',
                                height:'100%',
                                display:'flex',
                                justifyContent:'center',
                                alignItems:'center'
                                }}>
                                파일을 추가하세요.
                            </div>
                    </div>

                    <div style={{display:'flex',alignItems:'center',height:'3em',backgroundColor:'rgb(223,231,243)'}}>
                        <label htmlFor='doc'>
                            <div className='fileButton'>파일추가</div>
                        </label>
                        <div className='fileButton' onClick={this.handleDeleteSelectedFiles}>항목제거</div>
                        <div className='fileButton' onClick={this.handleDeleteAllFiles}>전체제거</div>
                        <input style={{display:'none'}} type="file" multiple id='doc' onChange={this.handleAddFiles}/>
                    </div>
                </div>
            </div>
        )
    }

    handleAddFiles(e){
        e.preventDefault();
        var files = e.target.files
        var style = "width:100%;margin-bottom:1em;text-align:center;padding:1em 0em 1em 0em;";
        for(var i=0;i<files.length;i++){
            
            var fileDivCheckLabel = document.createElement("label");

            var fileDivCheck = document.createElement("input");
            fileDivCheck.type = 'checkbox';
            fileDivCheck.style.cssText = 'display:none;';

            var fileName = document.createTextNode(files[i].name);
            fileDivCheckLabel.appendChild(fileName);
            fileDivCheckLabel.appendChild(fileDivCheck);
            
            fileDivCheckLabel.style.cssText = style;
            fileDivCheckLabel.onclick = (e)=>{
                if(e.target.childNodes.length){
                    if(!e.target.childNodes[1].checked){
                        e.target.style.cssText = style+"background-color:gray;color:white;";
                    }
                    else{
                        e.target.style.cssText = style+"background-color:white;";
                    }
                }
            };
            this.fileDiv.current.childNodes[0].style.cssText = 'display:none;';
            this.fileDiv.current.appendChild(fileDivCheckLabel);
        }
    }

    handleDeleteSelectedFiles(e){
        e.preventDefault();
        alert("선택된 항목을 지우시겠습니까?");
    }

    handleDeleteAllFiles(e){
        e.preventDefault();
        alert('전체 항목을 지우시겠습니까?');
    }
}

export default DocInputPage;