const UPDATE_NEW_POST_TEXT = 'UPDATE-NEW-POST-TEXT';
const ADD_POST = 'ADD-POST';

const store = {
	_state: {
		profilePage: {
			posts: [
				{ id: 1, message: 'Hello, my friend', likesCount: 32 },
				{ id: 2, message: 'I am learning react!', likesCount: 13 },
			],
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
	},
	getState() {
		return this._state;
	},

	subscribeOnStateChanged(observer) {
		this._onStateChanged = observer;
	},
	_onStateChanged: (state) => {},

	addPost() {
		this._state.profilePage.posts.push({
			id: 5,
			message: this._state.profilePage.newPostText,
			likesCount: 0,
		});
		this._state.profilePage.newPostText = '';
		this._onStateChanged(this._state);
	},
	updateNewPostText(text) {
		this._state.profilePage.newPostText = text;
		this._onStateChanged(this._state);
	},

	addMessage() {
		this._state.dialogsPage.messages.push({
			id: 3,
			message: this._state.dialogsPage.newMessageText,
		});
		this._state.dialogsPage.newMessageText = '';
		this._onStateChanged(this._state);
	},
	updateNewMessageText(text) {
		this._state.dialogsPage.newMessageText = text;
		this._onStateChanged(this._state);
	},

	dispatch(action) {
		if (action.type === ADD_POST) {
			this.addPost();
		}
		if (action.type === UPDATE_NEW_POST_TEXT) {
			this.updateNewPostText(action.text);
		}
	},
};

export const addPostActionCreator = () => ({
	type: ADD_POST,
});
export const updateNewPostTextActionCreator = (text) => ({
	type: UPDATE_NEW_POST_TEXT,
	text: text,
});

export default store;
