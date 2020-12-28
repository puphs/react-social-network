import s from './User.module.css';
import userPhoto from '../../../assets/images/user-photo.png';
import { NavLink } from 'react-router-dom';
import cn from 'classnames';

const User = ({ user, followUser, unfollowUser, followingInProgressUsers, isAuth }) => {
	const userProfileLink = '/profile/' + user.id;
	const onFollowBtnClick = () => {
		if (user.followed) {
			unfollowUser(user.id);
		} else {
			followUser(user.id);
		}
	};

	return (
		<div className={cn(s.user, 'roundBorderContainer')}>
			<div className={s.avatarContainer}>
				<NavLink to={userProfileLink}>
					<img className={s.avatarImg} src={user.photos.small ?? userPhoto} alt="" />
				</NavLink>

				{isAuth && (
					<button
						className={cn(s.followBtn, 'btnBase', 'shadowBase')}
						disabled={followingInProgressUsers.has(user.id)}
						onClick={onFollowBtnClick}
					>
						{user.followed ? 'unfollow' : 'follow'}
					</button>
				)}
			</div>

			<div className={s.aboutContainer}>
				<div className={s.aboutTop}>
					<NavLink to={userProfileLink} className={s.name}>
						{user.name}
					</NavLink>
					{user.status ? (
						<div className={s.status}>{user.status}</div>
					) : (
						<div className={cn(s.status, s.status_empty)}>No status</div>
					)}
				</div>
			</div>
		</div>
	);
};

export default User;
