const TOGGLE_FOLLOW_USER = 'TOGGLE_FOLLOW_USER';
const SET_USERS = 'SET_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_TOTAL_USERS_COUNT_CREATOR = 'SET_TOTAL_USERS_COUNT_CREATOR';
const SET_IS_FETCHING = 'SET_IS_FETCHING';

const initialState = {
	users: [],
	pageSize: 3,
	totalUsersCount: 0,
	currentPage: 1,
	isFetching: true,
};

const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case TOGGLE_FOLLOW_USER:
			return {
				...state,
				users: state.users.map((user) => {
					if (user.id === action.id) {
						return { ...user, followed: !user.followed };
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
		default:
			return state;
	}
};

export default usersReducer;

export const followUserToggleCreator = (id) => ({
	type: TOGGLE_FOLLOW_USER,
	id: id,
});

export const setUsersCreator = (users) => ({
	type: SET_USERS,
	users: users,
});

export const setCurrentPageCreator = (page) => ({
	type: SET_CURRENT_PAGE,
	page: page,
});

export const setTotalUsersCountCreator = (count) => ({
	type: SET_TOTAL_USERS_COUNT_CREATOR,
	count: count,
});

export const setIsFetchingCreator = (isFetching) => ({
	type: SET_IS_FETCHING,
	isFetching: isFetching,
});
