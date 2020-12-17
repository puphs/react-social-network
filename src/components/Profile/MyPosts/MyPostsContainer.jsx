import React from 'react';
import { addPostCreator, updateNewPostTextCreator } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import StoreContext from './../../../StoreContext';
const MyPostsContainer = (props) => {
	return (
		<StoreContext.Consumer>
			{(store) => {
				const state = store.getState();

				const updateNewPostText = (text) => {
					store.dispatch(updateNewPostTextCreator(text));
				};

				const addPost = () => {
					store.dispatch(addPostCreator());
				};
				return (
					<MyPosts
						updateNewPostText={updateNewPostText}
						addPost={addPost}
						posts={state.profilePage.posts}
						newPostText={state.newPostText}
					/>
				);
			}}
		</StoreContext.Consumer>
	);
};

export default MyPostsContainer;
