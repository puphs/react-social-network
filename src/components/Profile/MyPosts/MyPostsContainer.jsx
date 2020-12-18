import React from 'react';
import { addPostCreator, updateNewPostTextCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
// const MyPostsContainer = (props) => {
// 	return (
// 		<StoreContext.Consumer>
// 			{(store) => {
// 				const state = store.getState();

// 				const updateNewPostText = (text) => {};

// 				const addPost = () => {};
// 				return (
// 					<MyPosts
// 						updateNewPostText={updateNewPostText}
// 						addPost={addPost}
// 						posts={state.profilePage.posts}
// 						newPostText={state.profilePage.newPostText}
// 					/>
// 				);
// 			}}
// 		</StoreContext.Consumer>
// 	);
// };

const mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
		newPostText: state.profilePage.newPostText,
	};
};

const matDispatchToProps = (dispatch) => {
	return {
		updateNewPostText: (text) => {
			dispatch(updateNewPostTextCreator(text));
		},
		addPost: () => {
			dispatch(addPostCreator());
		},
	};
};

const MyPostsContainer = connect(mapStateToProps, matDispatchToProps)(MyPosts);

export default MyPostsContainer;
