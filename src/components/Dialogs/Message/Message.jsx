import s from './Message.module.css';

const Message = (props) => {
	let messageRight = '';
	if (props.messageFromRight) messageRight = s.message_right;
	return (
		<div className={s.message + ' ' + messageRight}>
			<div className={s.text}>{props.message}</div>
		</div>
	);
};

export default Message;
