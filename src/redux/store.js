import dialogsReducer from './dialogsReducer';
import profileReducer from './profileReducer';
import sidebarReducer from './sidebarReducer';

const store = {
	_state: {
		profilePage: {
			posts: [{ id: 1, message: 'Hello, my friend', likesCount: 32 }],
			newPostText: '',
		},
		dialogsPage: {
			dialogs: [
				{ id: 1, name: 'Dima' },
				{ id: 2, name: 'Petya' },
				{ id: 3, name: 'Sasha' },
				{ id: 4, name: 'Oleg' },
			],
			messages: [
				{ id: 1, message: 'Hi' },
				{ id: 2, message: 'Hello' },
			],
			newMessageText: '',
		},
		sidebar: {},
	},
	getState() {
		return this._state;
	},

	subscribeOnStateChanged(observer) {
		this._onStateChanged = observer;
	},
	_onStateChanged: (state) => {},

	dispatch(action) {
		profileReducer(this._state.profilePage, action);
		dialogsReducer(this._state.dialogsPage, action);
		sidebarReducer(this._state.sidebar, action);
		this._onStateChanged(this._state);
	},
};

export default store;
