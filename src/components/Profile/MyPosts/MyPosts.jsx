import React from 'react';
import { addPostActionCreator, updateNewPostTextActionCreator } from '../../../redux/store';
import s from './MyPosts.module.css';
import Post from './Post/Post';
const MyPosts = (props) => {
	let posts = props.posts ?? [];

	const postElements = posts.map((data) => (
		<Post message={data.message} likesCount={data.likesCount} />
	));

	const postInputElementRef = React.createRef();

	const updateNewPostText = () => {
		const text = postInputElementRef.current.value;
		props.dispatch(updateNewPostTextActionCreator(text));
	};

	const addPost = () => {
		// props.addPost();
		props.dispatch(addPostActionCreator());
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
