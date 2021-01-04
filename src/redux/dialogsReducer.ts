import dialogsApi from '../api/dialogsApi';
import { DialogType, MessageType, ThunkType } from '../types/types';
import { InferActionsTypes } from './reduxStore';

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

type ActionTypes = InferActionsTypes<typeof actions>;

const dialogsReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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

export const actions = {
	addMessage: (message: string) =>
		({
			type: ADD_MESSAGE,
			message,
		} as const),

	setCurrentDialog: (dialog: number) =>
		({
			type: SET_CURRENT_DIALOG,
			dialog,
		} as const),

	setDialogs: (dialogs: Array<DialogType>) =>
		({
			type: SET_DIALOGS,
			dialogs,
		} as const),
};

export const loadDialogs = (): ThunkType<ActionTypes> => async (dispatch) => {
	const data = await dialogsApi.loadDialogs();
	if (data.resultCode === 0) {
		dispatch(actions.setDialogs(data.dialogs));
	}
};

export const startChatting = (userId: number): ThunkType<ActionTypes> => async (dispatch) => {
	const data = await dialogsApi.startChatting(userId);
	if (data.resultCode === 0) {
	}
};
