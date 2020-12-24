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

export const getAuthUserData = () => {
	return (dispatch) => {
		authApi.auth().then((data) => {
			if (data.resultCode === 0) {
				const { id, email, login } = data.data;
				dispatch(setAuthUserData(id, email, login, true));
			}
		});
	};
};

export const login = (email, password, rememberMe) => {
	return (dispatch) => {
		authApi.login(email, password, rememberMe).then((data) => {
			if (data.resultCode === 0) {
				dispatch(getAuthUserData());
			} else {
				const errorText = data.messages.length > 0 ? data.messages[0] : 'Error happened';
				return dispatch(stopSubmit('login', { _error: errorText }));
			}
		});
	};
};

export const logout = () => {
	return (dispatch) => {
		authApi.logout().then((data) => {
			if (data.resultCode === 0) {
				dispatch(setAuthUserData(null, null, null, false));
			} else {
			}
		});
	};
};
