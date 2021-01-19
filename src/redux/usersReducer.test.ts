import usersReducer, { actions, InitialStateType } from './usersReducer';

let state: InitialStateType;

beforeEach(() => {
	state = {
		users: [
			{ id: 0, followed: false, name: 'Jossy', photos: { small: '', large: '' }, status: '' },
			{ id: 1, followed: false, name: 'Jacob', photos: { small: '', large: '' }, status: '' },
			{ id: 2, followed: true, name: 'Tory', photos: { small: '', large: '' }, status: '' },
		],
		pageSize: 3,
		totalUsersCount: 0,
		currentPage: 1,
		followingInProgressUsers: new Set(),
		isFetching: false,
	};
});

describe('usersReducer', () => {
	test('user following works correctly', () => {
		const newState = usersReducer(state, actions.setFollowUser(1, true));

		expect(newState.users[0].followed).toBeFalsy();
		expect(newState.users[1].followed).toBeTruthy();
		expect(newState.users[2].followed).toBeTruthy();
	});

	test('user unfollowing works correctly', () => {
		const newState = usersReducer(state, actions.setFollowUser(2, false));

		expect(newState.users[0].followed).toBeFalsy();
		expect(newState.users[1].followed).toBeFalsy();
		expect(newState.users[2].followed).toBeFalsy();
	});
});
// test('', () => {

// });
