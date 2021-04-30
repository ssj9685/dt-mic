import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";

export default function configureStore(reducer,
	initialState = {
		src:[],
		company:'',
		bank:'',
		account:'',
		name:'',
		page:1,
		collect:false,
		lookUp:false,
		sign:'',
		credit:false,
		disease:false,
		pid:false,
		all:false,
		permission: null,
	})
	{
		const enhancer = compose(
			applyMiddleware(thunk),
			window.devToolsExtension ? window.devToolsExtension() : f => f
		);
		return createStore(reducer, initialState, enhancer);
	}