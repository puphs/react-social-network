import s from './DialogItem.module.css';
import { NavLink } from 'react-router-dom';
import userPhoto from '../../../assets/images/user-photo.png';

type PropsType = {
	id: number;
	name: string;
};

const DialogItem: React.FC<PropsType> = ({ id, name }) => {
	const path = '/dialogs/' + id;
	return (
		<NavLink className={s.dialog} to={path} activeClassName={s.active}>
			<img className={s.avatar} src={userPhoto} alt={'user avatar'} />
			<div className={s.name}>{name}</div>
		</NavLink>
	);
};

export default DialogItem;
