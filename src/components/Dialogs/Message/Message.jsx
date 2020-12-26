import s from './Message.module.css';

const Message = ({ message, messageFromRight }) => {
	let messageRight = '';
	if (messageFromRight) messageRight = s.message_right;
	return (
		<div className={s.message + ' ' + messageRight}>
			<div className={s.text}>{message}</div>
		</div>
	);
};

export default Message;
