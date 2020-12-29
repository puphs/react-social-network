import { dialogsApi } from '../api/api';

const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';
const SET_CURRENT_DIALOG = 'dialogs/SET_CURRENT_DIALOG';
const SET_DIALOGS = 'dialogs/SET_DIALOGS';

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
	currentDialog: 1,
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
		case SET_CURRENT_DIALOG:
			return {
				...state,
				currentDialog: action.dialog,
			};
		case SET_DIALOGS:
			return {
				...state,
				dialogs: action.dialogs,
			};
		default:
			return state;
	}
};

export default dialogsReducer;

export const addMessage = (message) => ({
	type: ADD_MESSAGE,
	message,
});
export const setCurrentDialog = (dialog) => ({
	type: SET_CURRENT_DIALOG,
	dialog,
});
export const setDialogs = (dialogs) => ({
	type: SET_DIALOGS,
	dialogs,
});

export const loadDialogs = () => async (dispatch) => {
	const data = await dialogsApi.loadDialogs();
	if (data.resultCode === 0) {
		dispatch(setDialogs(data.dialogs));
	}
};

export const startChatting = (userId) => async (dispatch) => {
	const data = await dialogsApi.startChatting(userId);
	if (data.resultCode === 0) {
	}
};
