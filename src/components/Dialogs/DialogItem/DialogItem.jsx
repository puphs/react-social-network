import s from './DialogItem.module.css';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../../assets/images/user-photo.png';

const DialogItem = (props) => {
	const path = '/dialogs/' + props.id;
	return (
		<NavLink className={s.dialog} to={path} activeClassName={s.active}>
			<img className={s.avatar} src={userPhoto} />
			<div className={s.name}>{props.name}</div>
		</NavLink>
	);
};

export default DialogItem;
