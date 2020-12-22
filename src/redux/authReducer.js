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
			return { ...state, ...action.data, isAuth: true };
		default:
			return state;
	}
};

export default authReducer;

export const setUserData = (id, email, login) => ({
	type: SET_USER_DATA,
	data: { id, email, login },
});

export const getUserData = () => {
	return (dispatch) => {
		authApi.auth().then((data) => {
			if (data.resultCode === 0) {
				const { id, email, login } = data.data;
				dispatch(setUserData(id, email, login));
			}
		});
	};
};
