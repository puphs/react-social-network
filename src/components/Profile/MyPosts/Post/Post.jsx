import s from './Post.module.css';

const Post = (props) => {
	return (
		<div className={s.post + ' ' + 'roundBorderContainer'}>
			<div className={s.avatar}>
				<img
					className={s.avatarImg}
					src="https://img2.freepng.ru/20180319/pde/kisspng-computer-icons-icon-design-avatar-flat-face-icon-5ab06e33bee962.122118601521511987782.jpg"
				/>
				<div className={s.likes}>{props.likesCount || 0} likes</div>
			</div>
			<div className={s.text}>{props.message}</div>
		</div>
	);
};

export default Post;
