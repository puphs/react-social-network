import s from './Post.module.css';
import userPhoto from '../../../../assets/images/user-photo.png';
import cn from 'classnames';

const Post = (props) => {
	return (
		<div className={cn(s.post, 'roundBorderContainer')}>
			<div className={s.avatar}>
				<img className={s.avatarImg} src={props.profile.photos.small || userPhoto} />
				<div className={s.likes}>{props.likesCount || 0} likes</div>
			</div>
			<div className={s.text}>{props.message}</div>
		</div>
	);
};

export default Post;
