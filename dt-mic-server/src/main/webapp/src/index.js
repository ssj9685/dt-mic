import React from 'react';
import ReactDOM from 'react-dom';
import Insurance from './component/insurance/Insurance';
import 'index.css';
import { Provider } from 'react-redux';
import {createStore} from 'redux'
import reducer from './reducer/reducer';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Dashboard from './component/dashboard/Dashboard'
import Panel from './component/panel/Panel'
import NotFound from './component/common/NotFound';
import TesseractComp from './component/common/TesseractComp';
import OpencvComp from './component/common/OpencvComp'

const store = createStore(reducer);

const render = ()=>{
    ReactDOM.render(
        <Provider store={store}>
            <BrowserRouter>
            <Switch>
                <Route path="/user" render={()=><Insurance/>}/>
                <Route path="/panel" component={Panel}/>
                <Route path="/dashboard" component={Dashboard}/>
                <Route path='/tesseract' component={TesseractComp}/>
                <Route path='/opencv' component={OpencvComp}/>
                <Route render={()=><NotFound/>}/>
            </Switch>
            </BrowserRouter>
        </Provider>,
        document.getElementById('root')
    );
}

store.subscribe(render);
render();