import { UserType } from '../types/types';
import { axiosInstance, getData } from './api';

type UsersResponseType = {
	items: Array<UserType>;
	totalCount: number;
	error: string;
};
type FollowUnfollowResponseType = ResponseType;

const usersApi = {
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
export default usersApi;
