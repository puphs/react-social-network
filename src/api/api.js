import * as axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: { 'API-KEY': 'c350fdef-8fe3-4213-b69a-ff3048964702' },
});

const getData = (promise) => promise.then((response) => response.data);

export const usersApi = {
	loadUsers(page, count) {
		return getData(axiosInstance.get(`users?page=${page}&count=${count}`));
	},
	followUser(userId) {
		return getData(axiosInstance.post(`follow/${userId}`));
	},
	unfollowUser(userId) {
		return getData(axiosInstance.delete(`follow/${userId}`));
	},
};

export const profileApi = {
	loadProfile(userId) {
		return getData(axiosInstance.get(`profile/${userId}`));
	},
	getStatus(userId) {
		return getData(axiosInstance.get(`profile/status/${userId}`));
	},
	updateStatus(status) {
		return getData(axiosInstance.put(`profile/status`, { status: status || '' }));
	},
	updateAvatar(avatarFile) {
		const formData = new FormData();
		formData.append('image', avatarFile);
		return getData(
			axiosInstance.put('/profile/photo', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
		);
	},
	updateProfile(profile) {
		return getData(axiosInstance.put('/profile', profile));
	},
};

export const dialogsApi = {
	loadDialogs() {
		return getData(axiosInstance.get('/dialogs'));
	},

	startChatting(userId) {
		return getData(axiosInstance.put(`/dialogs/${userId}`));
	},
};

export const authApi = {
	auth() {
		return getData(axiosInstance.get('auth/me'));
	},
	login(email, password, rememberMe, captcha) {
		return getData(
			axiosInstance.post('auth/login', {
				email,
				password,
				rememberMe,
				captcha,
			})
		);
	},
	logout() {
		return getData(axiosInstance.delete('auth/login'));
	},
};

export const securityApi = {
	getCaptchaUrl() {
		return getData(axiosInstance.get('security/get-captcha-url'));
	},
};
