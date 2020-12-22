import { NavLink } from 'react-router-dom';
import s from './LoginInfo.module.css';

const LoginInfo = (props) => {
	return (
		<div>
			{props.isAuth ? (
				<div>
					<div className={s.login}>{props.login}</div>
				</div>
			) : (
				<NavLink className="btnBase" to="/login">
					Login
				</NavLink>
			)}
		</div>
	);
};

export default LoginInfo;
