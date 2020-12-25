import { createSelector } from 'reselect';

export const getUsers = (state) => state.usersPage.users;

// test reselect lib
export const getFilteredUsers = createSelector(getUsers, (users) => {
	return users.filter((user) => user.name.length <= 5);
});

export const getPageSize = (state) => state.usersPage.pageSize;

export const getTotalUsersCount = (state) => state.usersPage.totalUsersCount;

export const getCurrentPage = (state) => state.usersPage.currentPage;

export const getIsFetching = (state) => state.usersPage.isFetching;
