import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import store from './redux/store';

//addPost('Hi, guys!');

export const renderEntireTree = (state) => {
	ReactDOM.render(
		<React.StrictMode>
			<App state={store.getState()} dispatch={store.dispatch.bind(store)} />
		</React.StrictMode>,
		document.getElementById('root')
	);
};

store.subscribeOnStateChanged(renderEntireTree);

renderEntireTree(store.getState());
