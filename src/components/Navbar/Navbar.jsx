import { NavLink } from 'react-router-dom';
import s from './Navbar.module.css';

const Navbar = () => {
	return (
		<nav className={s.nav}>
			<ul>
				<li className={s.item}>
					<NavLink className={`${s.itemLink}`} to="/profile" activeClassName={s.itemLink_active}>
						Profile
					</NavLink>
				</li>
				<li className={s.item}>
					<NavLink className={s.itemLink} to="/dialogs" activeClassName={s.itemLink_active}>
						Dialogs
					</NavLink>
				</li>
				<li className={s.item}>
					<NavLink className={s.itemLink} to="/news" activeClassName={s.itemLink_active}>
						News
					</NavLink>
				</li>
				<li className={s.item}>
					<NavLink className={s.itemLink} to="/music" activeClassName={s.itemLink_active}>
						Music
					</NavLink>
				</li>
				<li className={s.item}>
					<NavLink className={s.itemLink} to="/settings" activeClassName={s.itemLink_active}>
						Settings
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;
