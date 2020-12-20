import s from './User.module.css';
import userPhoto from '../../../assets/images/user-photo.png';

const User = (props) => {
	const user = props.user;

	const onToggleFollowUser = () => {
		props.toggleFollowUser(user.id);
	};

	return (
		<div className={s.user + ' ' + 'gradientContainerBase'}>
			<div className={s.avatarContainer}>
				<img className={s.avatarImg} src={user.photos.small ?? userPhoto} alt="" />
				<button className={s.followBtn + ' ' + 'btnBase'} onClick={onToggleFollowUser}>
					{user.followed ? 'unfollow' : 'follow'}
				</button>
			</div>
			<div className={s.aboutContainer}>
				<div className={s.aboutTop}>
					<div className={s.name}>{user.name}</div>
					<div className={s.status}>{user.status}</div>
				</div>
				<div className={s.aboutBottom}>
					<div className={s.location}>
						{'user.location.country'}, {'user.location.city'}
					</div>
				</div>
			</div>
		</div>
	);
};

export default User;
