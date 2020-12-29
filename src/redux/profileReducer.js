import { profileApi } from '../api/api';
import { showAndHideError } from './appReducer';

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const UPDATE_NEW_STATUS_TEXT = 'UPDATE_NEW_STATUS_TEXT';
const UPDATE_PROFILE_PHOTOS = 'UPDATE_PROFILE_PHOTOS';
const SET_IS_FETCHING = 'SET_IS_FETCHING';

const initialState = {
	posts: [{ id: 1, message: 'Hello, my friend', likesCount: 32 }],
	newPostText: '',
	profile: null,
	status: '',
	isFetching: false,
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: state.posts.length + 1,
				message: action.postText,
				likesCount: 0,
			};
			return {
				...state,
				posts: [...state.posts, newPost],
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
		case UPDATE_NEW_STATUS_TEXT:
			return {
				...state,
				newStatusText: action.text,
			};
		case UPDATE_PROFILE_PHOTOS:
			return {
				...state,
				profile: { ...state.profile, photos: action.photos },
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

export const addPost = (postText) => ({
	type: ADD_POST,
	postText,
});
export const deletePost = (postId) => ({
	type: DELETE_POST,
	postId,
});

export const setProfile = (profile) => ({
	type: SET_PROFILE,
	profile,
});
export const setStatus = (status) => ({
	type: SET_STATUS,
	status,
});
export const updateProfilePhotos = (photos) => ({
	type: UPDATE_PROFILE_PHOTOS,
	photos,
});
export const setIsFetching = (isFetching) => ({
	type: SET_IS_FETCHING,
	isFetching,
});

export const loadProfile = (userId) => async (dispatch) => {
	dispatch(setIsFetching(true));
	const data = await profileApi.loadProfile(userId);
	dispatch(setProfile(data));
	dispatch(setIsFetching(false));
};

export const getStatus = (userId) => async (dispatch) => {
	const data = await profileApi.getStatus(userId);
	dispatch(setStatus(data));
};

export const updateStatus = (status) => async (dispatch) => {
	const data = await profileApi.updateStatus(status);
	if (data.resultCode === 0) {
		dispatch(setStatus(status));
	} else {
		dispatch(showAndHideError(data.messages[0]));
	}
};

export const updateAvatar = (avatar) => async (dispatch) => {
	const data = await profileApi.updateAvatar(avatar);
	if (data.resultCode === 0) {
		dispatch(updateProfilePhotos(data.data));
	} else {
		dispatch(showAndHideError(data.messages[0]));
	}
};

export const updateProfile = (profile) => async (dispatch) => {
	const data = await profileApi.updateProfile(profile);
	if (data.resultCode === 0) {
		dispatch(loadProfile(profile.userId));
	} else {
		dispatch(showAndHideError(data.messages[0]));
	}
};
