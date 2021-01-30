import { createSelector } from 'reselect';
import { UserType } from '../types/types';
import { AppStateType } from './reduxStore';

export const getUsers = (state: AppStateType) => state.usersPage.users;

// test reselect lib
export const getFilteredUsers = createSelector(getUsers, (users) => {
	return users.filter((user: UserType) => user.name.length <= 5);
});

export const getPageSize = (state: AppStateType) => state.usersPage.pageSize;

export const getTotalUsersCount = (state: AppStateType) => state.usersPage.totalUsersCount;

export const getCurrentPage = (state: AppStateType) => state.usersPage.currentPage;

export const getIsFetching = (state: AppStateType) => state.usersPage.isFetching;

export const getUsersFilter = (state: AppStateType) => state.usersPage.usersFilter;
