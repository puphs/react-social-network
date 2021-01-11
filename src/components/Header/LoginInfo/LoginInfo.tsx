import { NavLink } from 'react-router-dom';
import s from './LoginInfo.module.css';
import userPhoto from '../../../assets/images/user-photo.png';
import { ProfileType } from '../../../types/types';

type PropsType = {
	login: string | null;
	authProfile: ProfileType | null;
	isAuth: boolean;
	logout: () => void;
};

const LoginInfo: React.FC<PropsType> = ({ login, authProfile, isAuth, logout }) => {
	const onLogoutBtnClick = () => {
		logout();
	};

	return (
		<div className={s.loginContainer}>
			{isAuth ? (
				<>
					<div className={s.nameAndLogout}>
						<div className={s.login}>{login}</div>
						<button className={s.logoutBtn} onClick={onLogoutBtnClick}>
							Logout
						</button>
					</div>
					<NavLink to={'/profile'}>
						<img className={s.avatar} src={authProfile?.photos?.small || userPhoto} alt="user" />
					</NavLink>
				</>
			) : (
				<NavLink className="btnBase" to="/login">
					Login
				</NavLink>
			)}
		</div>
	);
};

export default LoginInfo;
