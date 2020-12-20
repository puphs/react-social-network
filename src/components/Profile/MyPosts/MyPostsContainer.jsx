import React from 'react';
import { addPost, updateNewPostText } from '../../../redux/profileReducer';
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

const MyPostsContainer = connect(mapStateToProps, {
	addPost,
	updateNewPostText,
})(MyPosts);

export default MyPostsContainer;
