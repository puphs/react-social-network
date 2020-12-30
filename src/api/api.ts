import axios, { AxiosResponse } from 'axios';
import { PhotosType, ProfileType, UserType } from '../types/types';

export enum ResultCode {
	Success = 0,
	Error = 1,
}
export enum ResultCodeCaptcha {
	CaptchaIsRequired = 10,
}

const axiosInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: { 'API-KEY': 'c350fdef-8fe3-4213-b69a-ff3048964702' },
});

const getData = <T>(promise: Promise<AxiosResponse<T>>) =>
	promise.then((response) => response.data);

type ResponseType<D = {}, RC = ResultCode> = {
	data: D;
	resultCode: RC;
	messages: Array<string>;
};

// users types, users api

type UsersResponseType = {
	items: Array<UserType>;
	totalCount: number;
	error: string;
};
type FollowUnfollowResponseType = ResponseType;

export const usersApi = {
	loadUsers(page: number, count: number) {
		return getData<UsersResponseType>(axiosInstance.get(`users?page=${page}&count=${count}`));
	},
	followUser(userId: number) {
		return getData<FollowUnfollowResponseType>(axiosInstance.post(`follow/${userId}`));
	},
	unfollowUser(userId: number) {
		return getData<FollowUnfollowResponseType>(axiosInstance.delete(`follow/${userId}`));
	},
};

// profile types, profile api

type LoadProfileResponseType = ProfileType;
type StatusResponseType = ResponseType;
type AvatarResponseType = ResponseType<{ photos: PhotosType }>;
type UpdateProfileResponseType = ResponseType;

export const profileApi = {
	loadProfile(userId: number) {
		return getData<LoadProfileResponseType>(axiosInstance.get(`profile/${userId}`));
	},
	getStatus(userId: number) {
		return getData<string>(axiosInstance.get(`profile/status/${userId}`));
	},
	updateStatus(status: string) {
		return getData<StatusResponseType>(
			axiosInstance.put(`profile/status`, { status: status || '' })
		);
	},
	updateAvatar(avatarFile: string) {
		const formData = new FormData();
		formData.append('image', avatarFile);
		return getData<AvatarResponseType>(
			axiosInstance.put('/profile/photo', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
		);
	},
	updateProfile(profile: ProfileType) {
		return getData<UpdateProfileResponseType>(axiosInstance.put('/profile', profile));
	},
};

// Not implemented yet
// dialogs types, dialogs api

export const dialogsApi = {
	loadDialogs() {
		return getData<any>(axiosInstance.get('/dialogs'));
	},

	startChatting(userId: number) {
		return getData<any>(axiosInstance.put(`/dialogs/${userId}`));
	},
};

// auth types, auth api
type AuthResponseType = ResponseType<
	{
		id: number;
		login: string;
		email: string;
	},
	ResultCode
>;
type LoginResponseType = ResponseType<
	{
		userId: number;
	},
	ResultCode | ResultCodeCaptcha
>;
type LogoutResponseType = ResponseType;
type CaptchaResponseType = {
	url: string;
};

export const authApi = {
	auth() {
		return getData<AuthResponseType>(axiosInstance.get('auth/me'));
	},
	login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
		return getData<LoginResponseType>(
			axiosInstance.post('auth/login', {
				email,
				password,
				rememberMe,
				captcha,
			})
		);
	},
	logout() {
		return getData<LogoutResponseType>(axiosInstance.delete('auth/login'));
	},
};

export const securityApi = {
	getCaptchaUrl() {
		return getData<CaptchaResponseType>(axiosInstance.get('security/get-captcha-url'));
	},
};
