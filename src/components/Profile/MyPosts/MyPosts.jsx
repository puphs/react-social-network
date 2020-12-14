import s from './MyPosts.module.css';
import Post from './Post/Post';

const MyPosts = () => {
	return (
		<div className={s.myPosts}>
			<div className={s.addPost}>
				<textarea placeholder="Write something..." className={s.postTextArea}></textarea>
				<button className={s.postBtn}>post</button>
			</div>
			<div className={s.posts}>
				<h2 className={s.postsHeader}>Posts</h2>
				<Post message="Hello there" />
				<Post message="It's my first post" likesCount="3" />
				<Post />
			</div>
		</div>
	);
};

export default MyPosts;
