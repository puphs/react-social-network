import s from './DialogItem.module.css';
import { NavLink } from 'react-router-dom';

const DialogItem = (props) => {
	const path = '/dialogs/' + props.id;
	return (
		<NavLink className={s.dialog} to={path} activeClassName={s.active}>
			<img
				className={s.avatar}
				src="https://img2.freepng.ru/20180319/pde/kisspng-computer-icons-icon-design-avatar-flat-face-icon-5ab06e33bee962.122118601521511987782.jpg"
			/>
			<div className={s.name}>{props.name}</div>
		</NavLink>
	);
};

export default DialogItem;
