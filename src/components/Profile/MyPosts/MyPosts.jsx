import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './MyPosts.module.css';
import Post from './Post/Post';

const AddPostForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field
				className={s.postTextArea + ' ' + 'inputBase'}
				name={'postText'}
				placeholder="Write something..."
				component={'textarea'}
			></Field>
			<button className={s.postBtn + ' ' + 'btnBase'} name={'addPostButton'}>
				post
			</button>
		</form>
	);
};

const AddPostReduxForm = reduxForm({ form: 'addPost' })(AddPostForm);

const MyPosts = (props) => {
	let posts = props.posts ?? [];

	const postElements = posts.map((data) => (
		<Post key={data.id} message={data.message} likesCount={data.likesCount} />
	));

	const onPostSubmit = (formData) => {
		console.log(formData);

		props.addPost(formData.postText);
	};

	return (
		<div className={s.myPosts}>
			<div className={s.addPost}>
				<AddPostReduxForm onSubmit={onPostSubmit} />
			</div>
			<div className={s.posts}>
				<h2 className={s.postsHeader}>Posts</h2>
				{postElements}
			</div>
		</div>
	);
};

export default MyPosts;
