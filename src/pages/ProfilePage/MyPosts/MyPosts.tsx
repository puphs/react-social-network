import React from 'react';
import { Field } from 'redux-form';
import s from './MyPosts.module.css';
import Post from './Post/Post';
import { maxLengthCreator, required } from '../../../utils/validators/validators';
import cn from 'classnames';
import withFormReset from '../../../components/hoc/withFormReset';
import { PostType, ProfileType } from '../../../types/types';

const maxLength10 = maxLengthCreator(10);

type AddFormPropsType = {
	handleSubmit: any;
};

const AddPostForm: React.FC<AddFormPropsType> = ({ handleSubmit }) => {
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
type MyPostsPropsType = {
	posts: Array<PostType>;
	addPost: any;
	profile: ProfileType;
};
const MyPosts: React.FC<MyPostsPropsType> = ({ posts, addPost, profile }) => {
	posts = posts ?? [];

	const postElements = posts.map((data) => (
		<Post key={data.id} message={data.message} likesCount={data.likesCount} profile={profile} />
	));

	const shouldResetForm = (formData: any) => {
		return formData.postText && formData.postText.trim();
	};

	const onPostSubmit = (formData: any) => {
		if (formData.postText && formData.postText.trim()) addPost(formData.postText);
	};

	return (
		<div className={s.myPosts}>
			<div className={s.addPost}>
				{withFormReset(AddPostForm, 'addPost', onPostSubmit, shouldResetForm)}
			</div>
			<div className={s.posts}>
				<h2 className={s.postsHeader}>Posts</h2>
				{postElements}
			</div>
		</div>
	);
};

export default MyPosts;
