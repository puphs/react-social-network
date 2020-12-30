import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { usersApi } from '../api/api';
import { ThunkType, UserType } from '../types/types';
import { AppStateType } from './reduxStore';

const SET_FOLLOW_USER = 'users/SET_FOLLOW_USER';
const SET_USERS = 'users/SET_USERS';
const SET_CURRENT_PAGE = 'users/SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT_CREATOR = 'users/SET_TOTAL_USERS_COUNT_CREATOR';
const SET_IS_FETCHING = 'users/SET_IS_FETCHING';
const SET_FOLLOWING_IN_PROGRESS_USER = 'users/SET_FOLLOWING_IN_PROGRESS_USER';

type InitialStateType = typeof initialState;

const initialState = {
	users: [] as Array<UserType>,
	pageSize: 3 as number,
	totalUsersCount: 0 as number,
	currentPage: 1 as number,

	isFetching: false as boolean,
	// set of ids of users we are following at the moment
	followingInProgressUsers: new Set() as Set<number>,
};

type ActionTypes =
	| SetFollowUserActionType
	| SetUsersActionType
	| SetTotalUsersCountActionType
	| SetIsFetchingActionType
	| SetFollowingInProgressUserActionType
	| SetCurrentPageActionType;

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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

type SetFollowUserActionType = {
	type: typeof SET_FOLLOW_USER;
	id: number;
	follow: boolean;
};
export const setFollowUser = (userId: number, follow: boolean): SetFollowUserActionType => ({
	type: SET_FOLLOW_USER,
	id: userId,
	follow,
});

type SetUsersActionType = {
	type: typeof SET_USERS;
	users: Array<UserType>;
};
export const setUsers = (users: Array<UserType>): SetUsersActionType => ({
	type: SET_USERS,
	users,
});

type SetCurrentPageActionType = {
	type: typeof SET_CURRENT_PAGE;
	page: number;
};
export const setCurrentPage = (page: number): SetCurrentPageActionType => ({
	type: SET_CURRENT_PAGE,
	page,
});

type SetTotalUsersCountActionType = {
	type: typeof SET_TOTAL_USERS_COUNT_CREATOR;
	count: number;
};
export const setTotalUsersCount = (count: number): SetTotalUsersCountActionType => ({
	type: SET_TOTAL_USERS_COUNT_CREATOR,
	count,
});

type SetIsFetchingActionType = {
	type: typeof SET_IS_FETCHING;
	isFetching: boolean;
};
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({
	type: SET_IS_FETCHING,
	isFetching,
});

type SetFollowingInProgressUserActionType = {
	type: typeof SET_FOLLOWING_IN_PROGRESS_USER;
	userId: number;
	isFollowingInProgress: boolean;
};
export const setFollowingInProgressUser = (
	userId: number,
	isFollowingInProgress: boolean
): SetFollowingInProgressUserActionType => ({
	type: SET_FOLLOWING_IN_PROGRESS_USER,
	userId,
	isFollowingInProgress,
});

type DispatchType = Dispatch<ActionTypes>;

export const loadUsers = (page: number, pageSize: number): ThunkType<ActionTypes> => async (
	dispatch
) => {
	dispatch(setIsFetching(true));
	const data = await usersApi.loadUsers(page, pageSize);
	dispatch(setIsFetching(false));
	dispatch(setUsers(data.items));
	dispatch(setTotalUsersCount(data.totalCount));
};

export const followUser = (userId: number): ThunkType<ActionTypes> => async (dispatch) => {
	_followUnfollowUser(dispatch, userId, true);
};

export const unfollowUser = (userId: number): ThunkType<ActionTypes> => async (dispatch) => {
	_followUnfollowUser(dispatch, userId, false);
};

const _followUnfollowUser = async (dispatch: DispatchType, userId: number, follow: boolean) => {
	dispatch(setFollowingInProgressUser(userId, true));

	if (follow) {
		await usersApi.followUser(userId);
	} else {
		await usersApi.unfollowUser(userId);
	}
	dispatch(setFollowUser(userId, follow));

	dispatch(setFollowingInProgressUser(userId, false));
};
