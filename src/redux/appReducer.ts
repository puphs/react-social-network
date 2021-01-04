import { ThunkType } from '../types/types';
import { getAuthUserData } from './authReducer';
import { InferActionsTypes } from './reduxStore';

const SET_INITIALIZED = 'app/SET_INITIALIZED';
const SHOW_ERROR = 'app/SHOW_ERROR';
const HIDE_ERROR = 'app/HIDE_ERROR';

export type InitialStateType = typeof initialState;

const initialState = {
	initialized: false as boolean,
	errorShown: false as boolean,
	errorText: null as string | null,
};

type ActionTypes = InferActionsTypes<typeof actions>;

export const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
	switch (action.type) {
		case SET_INITIALIZED:
			return {
				...state,
				initialized: true,
			};
		case SHOW_ERROR:
			return {
				...state,
				errorShown: true,
				errorText: action.errorText,
			};
		case HIDE_ERROR:
			return {
				...state,
				errorShown: false,
			};
		default:
			return state;
	}
};

export const actions = {
	setInitialized: () =>
		({
			type: SET_INITIALIZED,
		} as const),
	showError: (errorText: string) =>
		({
			type: SHOW_ERROR,
			errorText,
		} as const),
	hideError: () =>
		({
			type: HIDE_ERROR,
		} as const),
};

export const initialize = (): ThunkType<ActionTypes> => async (dispatch) => {
	await Promise.all([dispatch(getAuthUserData())]);
	dispatch(actions.setInitialized());
};

export const showAndHideError = (errorText: string): ThunkType<ActionTypes> => async (dispatch) => {
	dispatch(actions.showError(errorText));
	setTimeout(() => {
		dispatch(actions.hideError());
	}, 2500);
};
