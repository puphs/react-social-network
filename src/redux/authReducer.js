import { stopSubmit } from 'redux-form';
import { authApi, profileApi, securityApi } from '../api/api';

const SET_USER_DATA = 'SET_USER_DATA';
const SET_AUTH_PROFILE = 'SET_AUTH_PROFILE';
const SET_CAPTCHA_URL = 'SET_CAPTCHA_URL';

const initialState = {
	id: null,
	email: null,
	login: null,
	authProfile: null,
	isFetching: false,
	isAuth: false,
	captchaUrl: null,
};

const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USER_DATA:
			return { ...state, ...action.data };
		case SET_AUTH_PROFILE:
			return { ...state, authProfile: action.authProfile };
		case SET_CAPTCHA_URL:
			return { ...state, captchaUrl: action.captchaUrl };
		default:
			return state;
	}
};

export default authReducer;

export const setAuthUserData = (id, email, login, isAuth) => ({
	type: SET_USER_DATA,
	data: { id, email, login, isAuth },
});
export const setAuthProfile = (authProfile) => ({
	type: SET_AUTH_PROFILE,
	authProfile,
});
export const setCaptchaUrl = (captchaUrl) => ({
	type: SET_CAPTCHA_URL,
	captchaUrl,
});

export const getAuthUserData = () => async (dispatch) => {
	const authData = await authApi.auth();
	if (authData.resultCode === 0) {
		const { id, email, login } = authData.data;
		dispatch(setAuthUserData(id, email, login, true));

		const profileData = await profileApi.loadProfile(id);
		dispatch(setAuthProfile(profileData));
	}
};

export const login = (email, password, rememberMe, captcha) => async (dispatch) => {
	const data = await authApi.login(email, password, rememberMe, captcha);
	if (data.resultCode === 0) {
		dispatch(getAuthUserData());
		setCaptchaUrl(null);
	} else {
		const errorText = data.messages.length > 0 ? data.messages[0] : 'Error happened';
		dispatch(stopSubmit('login', { _error: errorText }));
		if (data.resultCode === 10) {
			dispatch(loadCaptchaUrl());
		}
	}
};

export const logout = () => async (dispatch) => {
	const data = await authApi.logout();
	if (data.resultCode === 0) {
		dispatch(setAuthUserData(null, null, null, false));
	}
};

export const loadCaptchaUrl = () => async (dispatch) => {
	const data = await securityApi.getCaptchaUrl();
	dispatch(setCaptchaUrl(data.url));
};
