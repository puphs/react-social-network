import { ThunkAction } from 'redux-thunk';
import { ThunkType } from '../types/types';
import { getAuthUserData } from './authReducer';
import { AppStateType } from './reduxStore';

const SET_INITIALIZED = 'app/SET_INITIALIZED';
const SHOW_ERROR = 'app/SHOW_ERROR';
const HIDE_ERROR = 'app/HIDE_ERROR';

export type InitialStateType = typeof initialState;

const initialState = {
	initialized: false as boolean,
	errorShown: false as boolean,
	errorText: null as string | null,
};

type ActionTypes = SetInitializedActionType | ShowErrorType | HideErrorType;

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

type SetInitializedActionType = {
	type: typeof SET_INITIALIZED;
};
export const setInitialized = (): SetInitializedActionType => ({
	type: SET_INITIALIZED,
});

type ShowErrorType = {
	type: typeof SHOW_ERROR;
	errorText: string;
};
export const showError = (errorText: string): ShowErrorType => ({
	type: SHOW_ERROR,
	errorText,
});

type HideErrorType = {
	type: typeof HIDE_ERROR;
};
export const hideError = (): HideErrorType => ({
	type: HIDE_ERROR,
});

export const initialize = (): ThunkType<ActionTypes> => async (dispatch) => {
	await Promise.all([dispatch(getAuthUserData())]);
	dispatch(setInitialized());
};

export const showAndHideError = (errorText: string): ThunkType<ActionTypes> => async (dispatch) => {
	dispatch(showError(errorText));
	setTimeout(() => {
		dispatch(hideError());
	}, 2500);
};
