import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import store from './redux/reduxStore';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from './StoreContext';

//addPost('Hi, guys!');

export const renderEntireTree = () => {
	ReactDOM.render(
		<React.StrictMode>
			<BrowserRouter>
				<Provider store={store}>
					<App />
				</Provider>
			</BrowserRouter>
		</React.StrictMode>,
		document.getElementById('root')
	);
};

// store.subscribeOnStateChanged(renderEntireTree);
store.subscribe(renderEntireTree);
renderEntireTree(store.getState());
