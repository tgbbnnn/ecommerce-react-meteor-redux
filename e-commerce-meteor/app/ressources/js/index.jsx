// react stuff
import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'


//redux stuff
import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'

// my stuff
import ClientApp from './components/clientApp'
import AdminOffice from './components/adminOffice'
import Portal from './components/portal'
import allReducers from './reducers/index.js'

import { BrowserRouter, Route} from 'react-router-dom'
let store = applyMiddleware(thunk)(createStore)(allReducers)// we are ready to async action

//lets go

ReactDOM.render(
	<Provider store={store}>
		
		<BrowserRouter>
			<div >
				<Route exact path ="/" component = {ClientApp} />
				<Route path ="/admin" component = {AdminOffice} />
				<Route path ="/admin_portal" component = {Portal} />
			</div>
		</BrowserRouter>
	
	</Provider>,
	document.getElementById('root')
)