import { ResultCode } from '../api/api';
import usersApi, { FollowUnfollowResponseType } from '../api/usersApi';
import { actions, followUser, InitialStateType, unfollowUser } from './usersReducer';

jest.mock('../api/usersApi');

const usersApiMock = usersApi as jest.Mocked<typeof usersApi>;

const followResult: FollowUnfollowResponseType = {
	resultCode: ResultCode.Success,
	messages: [],
	data: {},
};

usersApiMock.followUser.mockReturnValue(Promise.resolve(followResult));

const userId = 0;

const dispatchMock = jest.fn();
const getStateMock = jest.fn();

beforeEach(() => {
	usersApiMock.followUser.mockClear();
	usersApiMock.unfollowUser.mockClear();
	dispatchMock.mockClear();
	getStateMock.mockClear();
});

describe('usersReducer thunks', () => {
	test('user follow thunk works correctly', async () => {
		const thunk = followUser(userId);

		await thunk(dispatchMock, getStateMock, {});

		expect(dispatchMock).toBeCalledTimes(3);
		expect(dispatchMock).toHaveBeenNthCalledWith(
			1,
			actions.setFollowingInProgressUser(userId, true)
		);
		expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setFollowUser(userId, true));
		expect(dispatchMock).toHaveBeenNthCalledWith(
			3,
			actions.setFollowingInProgressUser(userId, false)
		);
	});

	test('user unfollow thunk works correctly', async () => {
		const thunk = unfollowUser(userId);

		await thunk(dispatchMock, getStateMock, {});

		expect(dispatchMock).toBeCalledTimes(3);
		expect(dispatchMock).toHaveBeenNthCalledWith(
			1,
			actions.setFollowingInProgressUser(userId, true)
		);
		expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.setFollowUser(userId, false));
		expect(dispatchMock).toHaveBeenNthCalledWith(
			3,
			actions.setFollowingInProgressUser(userId, false)
		);
	});
});
// test('', () => {

// });
