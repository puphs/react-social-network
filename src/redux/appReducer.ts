import { getAuthUserData } from './authReducer';

const SET_INITIALIZED = 'app/SET_INITIALIZED';
const SHOW_ERROR = 'app/SHOW_ERROR';
const HIDE_ERROR = 'app/HIDE_ERROR';

export type InitialStateType = typeof initialState;

const initialState = {
	initialized: false as boolean,
	errorShown: false as boolean,
	errorText: null as string | null,
};

export const appReducer = (state = initialState, action: any): InitialStateType => {
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

export const showError = (errorText: string) => ({
	type: SHOW_ERROR,
	errorText,
});
export const hideError = () => ({
	type: HIDE_ERROR,
});

export const initialize = () => async (dispatch: any) => {
	await Promise.all([dispatch(getAuthUserData())]);
	dispatch(setInitialized());
};

export const showAndHideError = (errorText: string) => (dispatch: any) => {
	dispatch(showError(errorText));
	setTimeout(() => {
		dispatch(hideError());
	}, 2500);
};
