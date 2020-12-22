import s from './User.module.css';
import userPhoto from '../../../assets/images/user-photo.png';
import { NavLink } from 'react-router-dom';

const User = (props) => {
	const user = props.user;
	const userProfileLink = '/profile/' + user.id;
	const onFollowBtnClick = () => {
		if (user.followed) {
			props.unfollowUser(user.id);
		} else {
			props.followUser(user.id);
		}
	};

	return (
		<div className={s.user + ' ' + 'gradientContainerBase'}>
			<div className={s.avatarContainer}>
				<NavLink to={userProfileLink}>
					<img className={s.avatarImg} src={user.photos.small ?? userPhoto} alt="" />
				</NavLink>
				<button
					className={s.followBtn + ' ' + 'btnBase'}
					disabled={props.followingInProgressUsers.has(user.id)}
					onClick={onFollowBtnClick}
				>
					{user.followed ? 'unfollow' : 'follow'}
				</button>
			</div>

			<div className={s.aboutContainer}>
				<div className={s.aboutTop}>
					<NavLink to={userProfileLink} className={s.name}>
						{user.name}
					</NavLink>
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
