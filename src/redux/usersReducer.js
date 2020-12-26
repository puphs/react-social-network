import { usersApi } from '../api/api';

const SET_FOLLOW_USER = 'SET_FOLLOW_USER';
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
		case SET_FOLLOW_USER:
			return {
				...state,
				users: state.users.map((user) => {
					if (user.id === action.id) {
						return { ...user, followed: action.follow };
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

export const setFollowUser = (userId, follow) => ({
	type: SET_FOLLOW_USER,
	id: userId,
	follow,
});

export const setUsers = (users) => ({
	type: SET_USERS,
	users,
});

export const setCurrentPage = (page) => ({
	type: SET_CURRENT_PAGE,
	page,
});

export const setTotalUsersCount = (count) => ({
	type: SET_TOTAL_USERS_COUNT_CREATOR,
	count,
});

export const setIsFetching = (isFetching) => ({
	type: SET_IS_FETCHING,
	isFetching,
});

export const setFollowingInProgressUser = (userId, isFollowingInProgress) => ({
	type: SET_FOLLOWING_IN_PROGRESS_USER,
	userId,
	isFollowingInProgress,
});

export const loadUsers = (page, pageSize) => async (dispatch) => {
	dispatch(setIsFetching(true));

	const data = await usersApi.loadUsers(page, pageSize);
	dispatch(setIsFetching(false));
	dispatch(setUsers(data.items));
	dispatch(setTotalUsersCount(data.totalCount));
};

const followUnfollowUser = async (dispatch, userId, follow) => {
	dispatch(setFollowingInProgressUser(userId, true));

	if (follow) {
		await usersApi.followUser(userId);
	} else {
		await usersApi.unfollowUser(userId);
	}
	dispatch(setFollowUser(userId, follow));

	dispatch(setFollowingInProgressUser(userId, false));
};

export const followUser = (userId) => (dispatch) => {
	followUnfollowUser(dispatch, userId, true);
};

export const unfollowUser = (userId) => (dispatch) => {
	followUnfollowUser(dispatch, userId, false);
};
