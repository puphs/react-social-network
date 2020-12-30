import { dialogsApi } from '../api/api';
import { DialogType, MessageType } from '../types/types';

const ADD_MESSAGE = 'dialogs/ADD_MESSAGE';
const SET_CURRENT_DIALOG = 'dialogs/SET_CURRENT_DIALOG';
const SET_DIALOGS = 'dialogs/SET_DIALOGS';

export type InitialStateType = typeof initialState;

const initialState = {
	dialogs: [
		{ id: 1, name: 'Dima' },
		{ id: 2, name: 'Petya' },
		{ id: 3, name: 'Sasha' },
		{ id: 4, name: 'Oleg' },
	] as Array<DialogType>,
	messages: [
		{ id: 1, message: 'Hi' },
		{ id: 2, message: 'Hello' },
	] as Array<MessageType>,
	currentDialog: 1 as number,
};

const dialogsReducer = (state = initialState, action: any): InitialStateType => {
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

type AddMessageActionType = {
	type: typeof ADD_MESSAGE;
	message: string;
};
export const addMessage = (message: string): AddMessageActionType => ({
	type: ADD_MESSAGE,
	message,
});

type SetCurrentDialogActionType = {
	type: typeof SET_CURRENT_DIALOG;
	dialog: number;
};
export const setCurrentDialog = (dialog: number): SetCurrentDialogActionType => ({
	type: SET_CURRENT_DIALOG,
	dialog,
});

type SetDialogsActionType = {
	type: typeof SET_DIALOGS;
	dialogs: Array<DialogType>;
};
export const setDialogs = (dialogs: Array<DialogType>): SetDialogsActionType => ({
	type: SET_DIALOGS,
	dialogs,
});

export const loadDialogs = () => async (dispatch: any) => {
	const data = await dialogsApi.loadDialogs();
	if (data.resultCode === 0) {
		dispatch(setDialogs(data.dialogs));
	}
};

export const startChatting = (userId: number) => async (dispatch: any) => {
	const data = await dialogsApi.startChatting(userId);
	if (data.resultCode === 0) {
	}
};
