import { getAuthUserData } from './authReducer';

const SET_INITIALIZED = 'SET_INITIALIZED';
const SHOW_ERROR = 'SHOW_ERROR';
const HIDE_ERROR = 'HIDE_ERROR';

const initialState = {
	initialized: false,
	errorShown: false,
	errorText: null,
};

export const appReducer = (state = initialState, action) => {
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
				errorText: action.error,
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

export const setInitialized = () => ({
	type: SET_INITIALIZED,
});

export const showError = (error) => ({
	type: SHOW_ERROR,
	error,
});
export const hideError = () => ({
	type: HIDE_ERROR,
});

export const initialize = () => async (dispatch) => {
	await Promise.all([dispatch(getAuthUserData())]);
	dispatch(setInitialized());
};

export const showAndHideError = (errorText) => (dispatch) => {
	dispatch(showError(errorText));
	setTimeout(() => {
		dispatch(hideError());
	}, 2500);
};
