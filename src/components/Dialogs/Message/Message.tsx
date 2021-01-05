import s from './Message.module.css';
import cn from 'classnames';

type Props = {
	message: string;
	messageFromRight?: boolean;
};

const Message: React.FC<Props> = ({ message, messageFromRight }) => {
	let messageRight = messageFromRight && s.message_right;
	if (messageFromRight) messageRight = s.message_right;
	return (
		<div className={cn(s.message, messageRight)}>
			<div className={s.text}>{message}</div>
		</div>
	);
};

export default Message;
