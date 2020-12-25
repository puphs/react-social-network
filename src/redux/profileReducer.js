import { profileApi } from '../api/api';

const ADD_POST = 'ADD_POST';
const DELETE_POST = 'DELETE_POST';
const SET_PROFILE = 'SET_PROFILE';
const SET_STATUS = 'SET_STATUS';
const UPDATE_NEW_STATUS_TEXT = 'UPDATE_NEW_STATUS_TEXT';

const initialState = {
	posts: [{ id: 1, message: 'Hello, my friend', likesCount: 32 }],
	newPostText: '',
	profile: null,
	status: '',
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

export const loadProfile = (userId) => {
	return (dispatch) => {
		profileApi.loadProfile(userId).then((data) => {
			dispatch(setProfile(data));
		});
	};
};

export const getStatus = (userId) => {
	return (dispatch) => {
		profileApi.getStatus(userId).then((data) => {
			dispatch(setStatus(data));
		});
	};
};

export const updateStatus = (status) => {
	return (dispatch) => {
		profileApi.updateStatus(status).then((data) => {
			if (data.resultCode === 0) {
				dispatch(setStatus(status));
			}
		});
	};
};
