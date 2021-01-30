import { UserType } from '../types/types';
import { axiosInstance, getData, ResponseType } from './api';

type UsersResponseType = {
	items: Array<UserType>;
	totalCount: number;
	error: string;
};
export type FollowUnfollowResponseType = ResponseType;

type LoadUsersParamsType = {
	page: number;
	count: number;
	term?: string;
	friend?: boolean | null;
};
const usersApi = {
	loadUsers(page: number, count: number, searchQuery: string = '', friend: boolean | null = null) {
		const params: LoadUsersParamsType = { page, count };
		if (searchQuery) params.term = searchQuery;
		if (friend !== null) params.friend = friend;

		return getData<UsersResponseType>(axiosInstance.get('users', { params }));
	},
	followUser(userId: number) {
		return getData<FollowUnfollowResponseType>(axiosInstance.post(`follow/${userId}`));
	},
	unfollowUser(userId: number) {
		return getData<FollowUnfollowResponseType>(axiosInstance.delete(`follow/${userId}`));
	},
};
export default usersApi;
