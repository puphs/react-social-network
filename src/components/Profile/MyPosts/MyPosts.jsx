import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import cn from 'classnames';
import withFormReset from '../../hoc/withFormReset';

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

const MyPosts = ({ posts, addPost, profile }) => {
	posts = posts ?? [];

	const postElements = posts.map((data) => (
		<Post key={data.id} message={data.message} likesCount={data.likesCount} profile={profile} />
	));

	const onPostSubmit = (formData, dispatch) => {
		addPost(formData.postText);
	};

	return (
		<div className={s.myPosts}>
			<div className={s.addPost}>{withFormReset(AddPostForm, 'addPost', onPostSubmit)}</div>
			<div className={s.posts}>
				<h2 className={s.postsHeader}>Posts</h2>
				{postElements}
			</div>
		</div>
	);
};

export default MyPosts;
