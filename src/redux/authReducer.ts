import { FormAction, stopSubmit } from 'redux-form';
import { ResultCode, ResultCodeCaptcha } from '../api/api';
import authApi from '../api/authApi';
import profileApi from '../api/profileApi';
import securityApi from '../api/securityApi';
import { PhotosType, ProfileType, ThunkType } from '../types/types';
import { InferActionsTypes } from './reduxStore';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_AUTH_PROFILE = 'auth/SET_AUTH_PROFILE';
const UPDATE_AUTH_PROFILE_PHOTOTS = 'auth/UPDATE_AUTH_PROFILE_PHOTOTS';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';

const initialState = {
	id: null as number | null,
	email: null as string | null,
	login: null as string | null,
	authProfile: null as ProfileType | null,
	isFetching: false as boolean,
	isAuth: false as boolean,
	captchaUrl: null as string | null,
};

type InitialStateType = typeof initialState;

type ActionTypes = InferActionsTypes<typeof actions>;

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
	switch (action.type) {
		case SET_USER_DATA:
			return { ...state, ...action.data };
		case SET_AUTH_PROFILE:
			return { ...state, authProfile: action.authProfile };
		case SET_CAPTCHA_URL:
			return { ...state, captchaUrl: action.captchaUrl };
		case UPDATE_AUTH_PROFILE_PHOTOTS:
			return {
				...state,
				authProfile: { ...state.authProfile, photos: action.photos } as ProfileType,
			};
		default:
			return state;
	}
};

export default authReducer;

export const actions = {
	setAuthUserData: (
		id: number | null,
		email: string | null,
		login: string | null,
		isAuth: boolean
	) =>
		({
			type: SET_USER_DATA,
			data: { id, email, login, isAuth },
		} as const),
	setAuthProfile: (authProfile: ProfileType) =>
		({
			type: SET_AUTH_PROFILE,
			authProfile,
		} as const),
	updateAuthProfilePhotos: (photos: PhotosType) =>
		({
			type: UPDATE_AUTH_PROFILE_PHOTOTS,
			photos,
		} as const),

	setCaptchaUrl: (captchaUrl: string | null) =>
		({
			type: SET_CAPTCHA_URL,
			captchaUrl,
		} as const),
};

export const getAuthUserData = (): ThunkType<ActionTypes> => async (dispatch) => {
	const authData = await authApi.auth();
	if (authData.resultCode === ResultCode.Success) {
		const { id, email, login } = authData.data;
		dispatch(actions.setAuthUserData(id, email, login, true));

		const profileData = await profileApi.loadProfile(id);
		dispatch(actions.setAuthProfile(profileData));
	}
};

export const login = (
	email: string,
	password: string,
	rememberMe: boolean,
	captcha: string | null
): ThunkType<ActionTypes | FormAction> => async (dispatch) => {
	const data = await authApi.login(email, password, rememberMe, captcha);
	if (data.resultCode === ResultCode.Success) {
		dispatch(getAuthUserData());
		actions.setCaptchaUrl(null);
	} else {
		const errorText = data.messages.length > 0 ? data.messages[0] : 'Error happened';
		dispatch(stopSubmit('login', { _error: errorText }));
		if (data.resultCode === ResultCodeCaptcha.CaptchaIsRequired) {
			dispatch(loadCaptchaUrl());
		}
	}
};

export const logout = (): ThunkType<ActionTypes> => async (dispatch) => {
	const data = await authApi.logout();
	if (data.resultCode === ResultCode.Success) {
		dispatch(actions.setAuthUserData(null, null, null, false));
	}
};

export const loadCaptchaUrl = (): ThunkType<ActionTypes> => async (dispatch) => {
	const data = await securityApi.getCaptchaUrl();
	dispatch(actions.setCaptchaUrl(data.url));
};
