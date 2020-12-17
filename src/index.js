import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import store from './redux/reduxStore';
import { BrowserRouter } from 'react-router-dom';

//addPost('Hi, guys!');

export const renderEntireTree = () => {
	ReactDOM.render(
		<React.StrictMode>
			<BrowserRouter>
				<App state={store.getState()} dispatch={store.dispatch.bind(store)} />
			</BrowserRouter>
		</React.StrictMode>,
		document.getElementById('root')
	);
};

// store.subscribeOnStateChanged(renderEntireTree);
store.subscribe(renderEntireTree);
renderEntireTree(store.getState());
