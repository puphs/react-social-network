const ADD_MESSAGE = 'ADD_MESSAGE';
const UPDATE_NEW_MESSAGE_TEXT = 'UPDATE_NEW_MESSAGE_TEXT';

const dialogsReducer = (state, action) => {
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
