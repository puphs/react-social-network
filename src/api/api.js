import * as axios from 'axios';

const axiosInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: { 'API-KEY': 'c350fdef-8fe3-4213-b69a-ff3048964702' },
});

const getData = (promise) => promise.then((response) => response.data);

export const usersApi = {
	getUsers(page, count) {
		return getData(axiosInstance.get(`users?page=${page}&count=${count}`));
	},
	followUser(userId) {
		return getData(axiosInstance.post(`follow/${userId}`));
	},
	unfollowUser(userId) {
		return getData(axiosInstance.delete(`follow/${userId}`));
	},
	getProfile(userId) {
		return getData(axiosInstance.get(`profile/${userId}`));
	},
};

export const authApi = {
	auth() {
		return getData(axiosInstance.get('auth/me'));
	},
};
