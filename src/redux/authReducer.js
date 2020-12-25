import { stopSubmit } from 'redux-form';
import { authApi } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';

const initialState = {
	id: null,
	email: null,
	login: null,
	isFetching: false,
	isAuth: false,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return { ...state, ...action.data };
		default:
			return state;
	}
};

export default authReducer;

export const setAuthUserData = (id, email, login, isAuth) => ({
	type: SET_USER_DATA,
	data: { id, email, login, isAuth },
});

export const getAuthUserData = () => async (dispatch) => {
	const data = await authApi.auth();
	if (data.resultCode === 0) {
		const { id, email, login } = data.data;
		dispatch(setAuthUserData(id, email, login, true));
	}
};

export const login = (email, password, rememberMe) => async (dispatch) => {
	const data = await authApi.login(email, password, rememberMe);
	console.log(data);
	if (data.resultCode === 0) {
		dispatch(getAuthUserData());
	} else {
		const errorText = data.messages.length > 0 ? data.messages[0] : 'Error happened';
		dispatch(stopSubmit('login', { _error: errorText }));
	}
};

export const logout = () => async (dispatch) => {
	const data = await authApi.logout();
	if (data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
};
