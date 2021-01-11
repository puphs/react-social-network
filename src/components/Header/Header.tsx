import s from './Header.module.css';
import LoginInfoContainer from './LoginInfo/LoginInfoContainer';

const Header: React.FC = () => {
	return (
		<header className={s.header}>
			<div className={s.title}>SOCIAL</div>
			<LoginInfoContainer />
		</header>
	);
};

export default Header;
