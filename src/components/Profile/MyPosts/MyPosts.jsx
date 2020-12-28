import React from 'react';
import { Field, reduxForm } from 'redux-form';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import cn from 'classnames';

const maxLength10 = maxLengthCreator(10);

const AddPostForm = ({ handleSubmit }) => {
	return (
		<form onSubmit={handleSubmit}>
			<Field
				className={cn(s.postTextArea, 'inputBase')}
				name={'postText'}
				placeholder="Write something..."
				validate={[required, maxLength10]}
				component={'textarea'}
			></Field>
			<button className={cn(s.postBtn, 'btnBase')} name={'addPostButton'}>
				post
			</button>
		</form>
	);
};

const AddPostReduxForm = reduxForm({ form: 'addPost' })(AddPostForm);

const MyPosts = ({ posts, addPost, profile }) => {
	posts = posts ?? [];

	const postElements = posts.map((data) => (
		<Post key={data.id} message={data.message} likesCount={data.likesCount} profile={profile} />
	));

	const onPostSubmit = (formData) => {
		addPost(formData.postText);
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
