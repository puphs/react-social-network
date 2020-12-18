import React from 'react';
import s from './MyPosts.module.css';
import Post from './Post/Post';
const MyPosts = (props) => {
	let posts = props.posts ?? [];

	const postElements = posts.map((data) => (
		<Post key={data.id} message={data.message} likesCount={data.likesCount} />
	));

	const postInputElementRef = React.createRef();

	const onUpdateNewPostText = (e) => {
		props.updateNewPostText(e.target.value);
	};

	const onAddPost = () => {
		props.addPost();
	};

	return (
		<div className={s.myPosts}>
			<div className={s.addPost}>
				<textarea
					className={s.postTextArea + ' ' + 'textAreaBase'}
					placeholder="Write something..."
					ref={postInputElementRef}
					value={props.newPostText}
					onChange={onUpdateNewPostText}
				></textarea>
				<button className={s.postBtn + ' ' + 'btnBase'} onClick={onAddPost}>
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
