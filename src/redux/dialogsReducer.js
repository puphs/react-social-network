const ADD_MESSAGE = 'ADD_MESSAGE';

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
			let newMesssage = {
				id: state.messages.length + 1,
				message: action.message,
			};
			return {
				...state,
				messages: [...state.messages, newMesssage],
			};
		default:
			return state;
	}
};

export default dialogsReducer;

export const addMessage = (message) => ({
	type: ADD_MESSAGE,
	message: message,
});
