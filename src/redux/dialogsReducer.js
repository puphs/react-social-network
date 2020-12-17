const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

const initialState = {
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
};

const dialogsReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_MESSAGE:
			state.messages.push({
				id: 3,
				message: state.newMessageText,
			});
			state.newMessageText = '';
			break;

		case UPDATE_NEW_MESSAGE_TEXT:
			state.newMessageText = action.text;
			break;
	}
	return state;
};

export default dialogsReducer;

export const addMessageCreator = () => ({
	type: ADD_MESSAGE,
});

export const updateNewMessageTextCreator = (text) => ({
	type: UPDATE_NEW_MESSAGE_TEXT,
	text: text,
});
