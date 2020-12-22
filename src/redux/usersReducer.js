import { usersApi } from '../api/api';

const FOLLOW_USER = 'FOLLOW_USER';
const UNFOLLOW_USER = 'UNFOLLOW_USER';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT_CREATOR = 'SET_TOTAL_USERS_COUNT_CREATOR';
const SET_IS_FETCHING = 'SET_IS_FETCHING';
const SET_FOLLOWING_IN_PROGRESS_USER = 'SET_FOLLOWING_IN_PROGRESS_USER';

const initialState = {
	users: [],
	pageSize: 3,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: false,
	followingInProgressUsers: new Set(),
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case FOLLOW_USER:
			return {
				...state,
				users: state.users.map((user) => {
					if (user.id === action.id) {
						return { ...user, followed: true };
					}
					return user;
				}),
			};
		case UNFOLLOW_USER:
			return {
				...state,
				users: state.users.map((user) => {
					if (user.id === action.id) {
						return { ...user, followed: false };
					}
					return user;
				}),
			};

		case SET_USERS:
			return {
				...state,
				users: action.users,
			};
		case SET_CURRENT_PAGE:
			return {
				...state,
				currentPage: action.page,
			};
		case SET_TOTAL_USERS_COUNT_CREATOR:
			return {
				...state,
				totalUsersCount: action.count,
			};
		case SET_IS_FETCHING:
			return {
				...state,
				isFetching: action.isFetching,
			};
		case SET_FOLLOWING_IN_PROGRESS_USER:
			let followingInProgressUsers = new Set(state.followingInProgressUsers);
			action.isFollowingInProgress
				? followingInProgressUsers.add(action.userId)
				: followingInProgressUsers.delete(action.userId);
			return {
				...state,
				followingInProgressUsers,
			};
		default:
			return state;
	}
};

export default usersReducer;

export const followUser = (id) => ({
	type: FOLLOW_USER,
	id,
});
export const unfollowUser = (id) => ({
	type: UNFOLLOW_USER,
	id,
});

export const setUsers = (users) => ({
	type: SET_USERS,
	users: users,
});

export const setCurrentPage = (page) => ({
	type: SET_CURRENT_PAGE,
	page: page,
});

export const setTotalUsersCount = (count) => ({
	type: SET_TOTAL_USERS_COUNT_CREATOR,
	count: count,
});

export const setIsFetching = (isFetching) => ({
	type: SET_IS_FETCHING,
	isFetching: isFetching,
});

export const setFollowingInProgressUser = (userId, isFollowingInProgress) => ({
	type: SET_FOLLOWING_IN_PROGRESS_USER,
	userId,
	isFollowingInProgress,
});

export const getUsers = (page, pageSize) => {
	return (dispatch) => {
		dispatch(setIsFetching(true));
		usersApi.getUsers(page, pageSize).then((data) => {
			dispatch(setIsFetching(false));
			dispatch(setUsers(data.items));
			dispatch(setTotalUsersCount(data.totalCount));
		});
	};
};

export const setFollowUser = (userId, follow) => {
	return (dispatch) => {
		dispatch(setFollowingInProgressUser(userId, true));

		usersApi.unfollowUser(userId).then((data) => {
			if (data.resultCode == 0) {
				if (follow) dispatch(followUser(userId));
				else dispatch(unfollowUser(userId));
			}
			dispatch(setFollowingInProgressUser(userId, false));
		});
	};
};
