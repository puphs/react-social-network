import { ResultCode } from '../api/api';
import profileApi from '../api/profileApi';
import { PhotosType, PostType, ProfileType, ThunkType } from '../types/types';
import { showAndHideError } from './appReducer';
import { actions as authActions } from './authReducer';
import { InferActionsTypes } from './reduxStore';

const ADD_POST = 'profile/ADD_POST';
const DELETE_POST = 'profile/DELETE_POST';
const SET_PROFILE = 'profile/SET_PROFILE';
const SET_STATUS = 'profile/SET_STATUS';
const UPDATE_PROFILE_PHOTOS = 'profile/UPDATE_PROFILE_PHOTOS';
const SET_IS_FETCHING = 'profile/SET_IS_FETCHING';

export type InitialStateType = typeof initialState;

const initialState = {
	posts: [{ id: 1, message: 'Hello, my friend', likesCount: 32 }] as Array<PostType>,
	profile: null as ProfileType | null,
	status: '' as string,
	isFetching: false as boolean,
};

type ActionTypes = InferActionsTypes<typeof actions>;

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: state.posts.length + 1,
				message: action.postText,
				likesCount: 0,
			};
			return {
				...state,
				posts: [newPost, ...state.posts],
			};
		case DELETE_POST:
			return {
				...state,
				posts: state.posts.filter((post) => post.id !== action.postId),
			};
		case SET_PROFILE:
			return {
				...state,
				profile: action.profile,
			};
		case SET_STATUS:
			return {
				...state,
				status: action.status,
			};
		case UPDATE_PROFILE_PHOTOS:
			return {
				...state,
				profile: { ...state.profile, photos: action.photos } as ProfileType,
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

export default profileReducer;

export const actions = {
	addPost: (postText: string) =>
		({
			type: ADD_POST,
			postText,
		} as const),

	deletePost: (postId: number) =>
		({
			type: DELETE_POST,
			postId,
		} as const),

	setProfile: (profile: ProfileType) =>
		({
			type: SET_PROFILE,
			profile,
		} as const),

	setStatus: (status: string) =>
		({
			type: SET_STATUS,
			status,
		} as const),

	updateProfilePhotos: (photos: PhotosType) =>
		({
			type: UPDATE_PROFILE_PHOTOS,
			photos,
		} as const),

	setIsFetching: (isFetching: boolean) =>
		({
			type: SET_IS_FETCHING,
			isFetching,
		} as const),
};

export const loadProfile = (userId: number): ThunkType<ActionTypes> => async (dispatch) => {
	dispatch(actions.setIsFetching(true));
	const data = await profileApi.loadProfile(userId);
	dispatch(actions.setProfile(data));
	dispatch(actions.setIsFetching(false));
};

export const getStatus = (userId: number): ThunkType<ActionTypes> => async (dispatch) => {
	const status = await profileApi.getStatus(userId);
	dispatch(actions.setStatus(status));
};

export const updateStatus = (status: string): ThunkType<ActionTypes> => async (dispatch) => {
	const data = await profileApi.updateStatus(status);
	if (data.resultCode === ResultCode.Success) {
		dispatch(actions.setStatus(status));
	} else {
		dispatch(showAndHideError(data.messages[0]));
	}
};

export const updateAvatar = (avatar: string): ThunkType<ActionTypes | any> => async (dispatch) => {
	const data = await profileApi.updateAvatar(avatar);
	if (data.resultCode === ResultCode.Success) {
		dispatch(actions.updateProfilePhotos(data.data.photos));
		dispatch(authActions.updateAuthProfilePhotos(data.data.photos));
	} else {
		dispatch(showAndHideError(data.messages[0]));
	}
};

export const updateProfile = (profile: ProfileType): ThunkType<ActionTypes> => async (dispatch) => {
	const data = await profileApi.updateProfile(profile);
	if (data.resultCode === ResultCode.Success) {
		dispatch(loadProfile(profile.userId));
	} else {
		dispatch(showAndHideError(data.messages[0]));
	}
};
