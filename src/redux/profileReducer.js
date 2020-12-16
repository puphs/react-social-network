const ADD_POST = 'ADD_POST';
const UPDATE_NEW_POST_TEXT = 'UPDATE_NEW_POST_TEXT';

const profileReducer = (state, action) => {
	switch (action.type) {
		case ADD_POST:
			state.posts.push({
				id: 5,
				message: state.newPostText,
				likesCount: 0,
			});
			state.newPostText = '';

		case UPDATE_NEW_POST_TEXT:
			state.newPostText = action.text;
			break;
	}
	return state;
};

export default profileReducer;

export const addPostCreator = () => ({
	type: ADD_POST,
});
export const updateNewPostTextCreator = (text) => ({
	type: UPDATE_NEW_POST_TEXT,
	text: text,
});
