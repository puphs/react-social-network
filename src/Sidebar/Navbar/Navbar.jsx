import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';

const Navbar = () => {
	return (
		<nav className={s.navbar}>
			<div className={s.item}>
				<NavLink className={`${s.itemLink}`} to="/profile" activeClassName={s.itemLink_active}>
					Profile
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink className={s.itemLink} to="/dialogs" activeClassName={s.itemLink_active}>
					Dialogs
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink className={s.itemLink} to="/news" activeClassName={s.itemLink_active}>
					News
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink className={s.itemLink} to="/music" activeClassName={s.itemLink_active}>
					Music
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink className={s.itemLink} to="/settings" activeClassName={s.itemLink_active}>
					Settings
				</NavLink>
			</div>
			<div className={s.item}>
				<NavLink className={s.itemLink} to="/users" activeClassName={s.itemLink_active}>
					Users
				</NavLink>
			</div>
		</nav>
	);
};

export default Navbar;
