import { FormAction, stopSubmit } from 'redux-form';
import { authApi, profileApi, ResultCode, ResultCodeCaptcha, securityApi } from '../api/api';
import { PhotosType, ProfileType, ThunkType } from '../types/types';

const SET_USER_DATA = 'auth/SET_USER_DATA';
const SET_AUTH_PROFILE = 'auth/SET_AUTH_PROFILE';
const UPDATE_AUTH_PROFILE_PHOTOTS = 'auth/UPDATE_AUTH_PROFILE_PHOTOTS';
const SET_CAPTCHA_URL = 'auth/SET_CAPTCHA_URL';

export type InitialStateType = typeof initialState;

const initialState = {
	id: null as number | null,
	email: null as string | null,
	login: null as string | null,
	authProfile: null as ProfileType | null,
	isFetching: false as boolean,
	isAuth: false as boolean,
	captchaUrl: null as string | null,
};

type ActionTypes =
	| SetAuthProfileActionType
	| UpdateAuthProfilePhotosActionType
	| SetCaptchaUrlActionType
	| SetAuthUserDataActionType;

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

type SetAuthUserDataActionType = {
	type: typeof SET_USER_DATA;
	data: {
		id: number | null;
		email: string | null;
		login: string | null;
		isAuth: boolean;
	};
};
export const setAuthUserData = (
	id: number | null,
	email: string | null,
	login: string | null,
	isAuth: boolean
): SetAuthUserDataActionType => ({
	type: SET_USER_DATA,
	data: { id, email, login, isAuth },
});

type SetAuthProfileActionType = {
	type: typeof SET_AUTH_PROFILE;
	authProfile: ProfileType;
};
export const setAuthProfile = (authProfile: ProfileType): SetAuthProfileActionType => ({
	type: SET_AUTH_PROFILE,
	authProfile,
});

type UpdateAuthProfilePhotosActionType = {
	type: typeof UPDATE_AUTH_PROFILE_PHOTOTS;
	photos: PhotosType;
};
export const updateAuthProfilePhotos = (photos: PhotosType): UpdateAuthProfilePhotosActionType => ({
	type: UPDATE_AUTH_PROFILE_PHOTOTS,
	photos,
});

type SetCaptchaUrlActionType = {
	type: typeof SET_CAPTCHA_URL;
	captchaUrl: string | null;
};
export const setCaptchaUrl = (captchaUrl: string | null): SetCaptchaUrlActionType => ({
	type: SET_CAPTCHA_URL,
	captchaUrl,
});

export const getAuthUserData = (): ThunkType<ActionTypes> => async (dispatch) => {
	const authData = await authApi.auth();
	if (authData.resultCode === ResultCode.Success) {
		const { id, email, login } = authData.data;
		dispatch(setAuthUserData(id, email, login, true));

		const profileData = await profileApi.loadProfile(id);
		dispatch(setAuthProfile(profileData));
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
		setCaptchaUrl(null);
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
		dispatch(setAuthUserData(null, null, null, false));
	}
};

export const loadCaptchaUrl = (): ThunkType<ActionTypes> => async (dispatch) => {
	const data = await securityApi.getCaptchaUrl();
	dispatch(setCaptchaUrl(data.url));
};
