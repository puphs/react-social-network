import { ResultCode } from '../api/api';
import profileApi from '../api/profileApi';
import { PhotosType, PostType, ProfileType, ThunkType } from '../types/types';
import { showAndHideError } from './appReducer';
import { updateAuthProfilePhotos } from './authReducer';

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

type ActionTypes =
	| SetIsFetchingActionType
	| UpdateProfilePhotosActionType
	| SetStatusActionType
	| SetProfileActionType
	| DeletePostActionType
	| AddPostActionType;

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

type AddPostActionType = {
	type: typeof ADD_POST;
	postText: string;
};
export const addPost = (postText: string): AddPostActionType => ({
	type: ADD_POST,
	postText,
});

type DeletePostActionType = {
	type: typeof DELETE_POST;
	postId: number;
};
export const deletePost = (postId: number): DeletePostActionType => ({
	type: DELETE_POST,
	postId,
});

type SetProfileActionType = {
	type: typeof SET_PROFILE;
	profile: ProfileType;
};
export const setProfile = (profile: ProfileType): SetProfileActionType => ({
	type: SET_PROFILE,
	profile,
});

type SetStatusActionType = {
	type: typeof SET_STATUS;
	status: string;
};
export const setStatus = (status: string): SetStatusActionType => ({
	type: SET_STATUS,
	status,
});

type UpdateProfilePhotosActionType = {
	type: typeof UPDATE_PROFILE_PHOTOS;
	photos: PhotosType;
};
export const updateProfilePhotos = (photos: PhotosType): UpdateProfilePhotosActionType => ({
	type: UPDATE_PROFILE_PHOTOS,
	photos,
});

type SetIsFetchingActionType = {
	type: typeof SET_IS_FETCHING;
	isFetching: boolean;
};
export const setIsFetching = (isFetching: boolean): SetIsFetchingActionType => ({
	type: SET_IS_FETCHING,
	isFetching,
});

export const loadProfile = (userId: number): ThunkType<ActionTypes> => async (dispatch) => {
	dispatch(setIsFetching(true));
	const data = await profileApi.loadProfile(userId);
	dispatch(setProfile(data));
	dispatch(setIsFetching(false));
};

export const getStatus = (userId: number): ThunkType<ActionTypes> => async (dispatch) => {
	const status = await profileApi.getStatus(userId);
	dispatch(setStatus(status));
};

export const updateStatus = (status: string): ThunkType<ActionTypes> => async (dispatch) => {
	const data = await profileApi.updateStatus(status);
	if (data.resultCode === ResultCode.Success) {
		dispatch(setStatus(status));
	} else {
		dispatch(showAndHideError(data.messages[0]));
	}
};

export const updateAvatar = (avatar: string): ThunkType<ActionTypes | any> => async (dispatch) => {
	const data = await profileApi.updateAvatar(avatar);
	if (data.resultCode === ResultCode.Success) {
		dispatch(updateProfilePhotos(data.data.photos));
		dispatch(updateAuthProfilePhotos(data.data.photos));
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
