import React from 'react';
import { addPostCreator, updateNewPostTextCreator } from '../../../redux/profileReducer';
import s from './MyPosts.module.css';
import Post from './Post/Post';
const MyPosts = (props) => {
	let posts = props.posts ?? [];

	const postElements = posts.map((data) => (
		<Post message={data.message} likesCount={data.likesCount} />
	));

	const postInputElementRef = React.createRef();

	const updateNewPostText = (e) => {
		props.dispatch(updateNewPostTextCreator(e.target.value));
	};

	const addPost = () => {
		// props.addPost();
		props.dispatch(addPostCreator());
	};

	return (
		<div className={s.myPosts}>
			<div className={s.addPost}>
				<textarea
					className={s.postTextArea + ' ' + 'textAreaBase'}
					placeholder="Write something..."
					ref={postInputElementRef}
					value={props.newPostText}
					onChange={updateNewPostText}
				></textarea>
				<button className={s.postBtn + ' ' + 'btnBase'} onClick={addPost}>
					post
				</button>
			</div>
			<div className={s.posts}>
				<h2 className={s.postsHeader}>Posts</h2>
				{postElements}
			</div>
		</div>
	);
};

export default MyPosts;
