import s from './Dialogs.module.css';
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

const Message = (props) => {
	let messageRight = '';
	if (props.messageFromRight) messageRight = s.message_right;
	return (
		<div className={s.message + ' ' + messageRight}>
			<div className={s.text}>{props.message}</div>
		</div>
	);
};

const Dialogs = (props) => {
	return (
		<main className={s.dialogs}>
			<div className={s.dialogItems}>
				<DialogItem name="Dima" id="1" />
				<DialogItem name="Sasha" id="2" />
				<DialogItem name="Arnold" id="3" />
				<DialogItem name="Dima" id="4" />
			</div>
			<div className={s.messages}>
				<Message message="Hi" messageFromRight />
				<Message message="Hello" />
			</div>
		</main>
	);
};

export default Dialogs;
