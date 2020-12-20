const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

const initialState = {
	posts: [{ id: 1, message: 'Hello, my friend', likesCount: 32 }],
	newPostText: '',
};

const profileReducer = (state = initialState, action) => {
	switch (action.type) {
		case ADD_POST:
			let newPost = {
				id: state.posts.length + 1,
				message: state.newPostText,
				likesCount: 0,
			};
			return {
				...state,
				posts: [...state.posts, newPost],
				newPostText: '',
			};

		case UPDATE_NEW_POST_TEXT:
			return {
				...state,
				newPostText: action.text,
			};
		default:
			return state;
	}
};

export default profileReducer;

export const addPost = () => ({
	type: ADD_POST,
});
export const updateNewPostText = (text) => ({
	type: UPDATE_NEW_POST_TEXT,
	text: text,
});
