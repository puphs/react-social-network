import { NavLink } from 'react-router-dom';
import s from './LoginInfo.module.css';
import userPhoto from '../../../assets/images/user-photo.png';

const LoginInfo = (props) => {
	const onLogoutBtnClick = () => {
		props.logout();
	};

	return (
		<div className={s.loginContainer}>
			{props.isAuth ? (
				<>
					<div className={s.nameAndLogout}>
						<div className={s.login}>{props.login}</div>
						<button className={s.logoutBtn} onClick={onLogoutBtnClick}>
							Logout
						</button>
					</div>
					<img className={s.avatar} src={userPhoto}></img>
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
