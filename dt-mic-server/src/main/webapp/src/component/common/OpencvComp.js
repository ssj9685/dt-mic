import React from 'react';

class OpencvComp extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      base64:'TPXUa.png',
    }
  }
    componentDidMount(){
        this.createScript()
    }
    render(){
        return(
            <></>
        )
    }

    createScript(){
        let script = document.createElement('script');
        script.innerHTML = `function opencvReady() {
            cv['onRuntimeInitialized']=()=>{
              let img = new Image();
              img.id = 'img';
              let canvas = document.createElement('canvas');
              canvas.id = 'canvas';
              img.onload = () => {
                canvas.width = img.width;
                canvas.height = img.height;
                let ctx = canvas.getContext('2d');

                let src = cv.imread('img')
                let dst = cv.Mat.zeros(src.rows, src.cols, cv.CV_8UC3);

                cv.cvtColor(src, src, cv.COLOR_RGB2GRAY,0);

                let kernel = new cv.Size(5,5);
                cv.GaussianBlur(src, src, kernel, 0, 0, cv.BORDER_DEFAULT);
                cv.Canny(src, src, 75, 200);
                let kernel_size = new cv.Size(11,11);
                let morph_kernel = cv.getStructuringElement(cv.MORPH_ELLIPSE,kernel_size);
                cv.morphologyEx(src,src,cv.MORPH_CLOSE,morph_kernel);
                
                let contours = new cv.MatVector();
                let hierarchy = new cv.Mat();
                cv.findContours(src, contours, hierarchy, cv.RETR_LIST, cv.CHAIN_APPROX_SIMPLE);

                let color = new cv.Scalar(0,0,255);
                for (let i = 0; i < contours.size(); ++i) {
                  let poly = new cv.Mat();
                  let cnt = contours.get(i);
                  peri = cv.arcLength(cnt, true)
                  cv.approxPolyDP(cnt, poly, 0.02*peri, true);
                  if(poly.size().height==4){
                    cv.drawContours(dst,contours,i,color,1,8,hierarchy,0)
                  }
                  cnt.delete(); poly.delete();
                }
                cv.imshow('canvas',dst);
                src.delete();
                dst.delete();
                contours.delete();
                hierarchy.delete();
              }
              img.src = '${this.state.base64}';
    
              document.body.appendChild(img);
              document.body.appendChild(canvas);
            }
          }`
          
        document.body.appendChild(script);
    }
}

export default OpencvComp;