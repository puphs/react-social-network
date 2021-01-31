import s from './Message.module.css';
import cn from 'classnames';
import { MessageType } from '../../../types/types';
import userPhoto from '../../../assets/images/user-photo.png';
import { Link } from 'react-router-dom';

type Props = {
	message: MessageType;
};

const Message: React.FC<Props> = ({ message }) => {
	return (
		<div className={s.message}>
			<Link to={`/profile/${message.userId}`}>
				<img className={s.photo} src={message.photo ?? userPhoto} alt={'user'} />
			</Link>
			<div className={s.authorAndText}>
				<Link to={`/profile/${message.userId}`}>
					<div className={s.author}>{message.userName}</div>
				</Link>
				<div className={s.text}>{message.message}</div>
			</div>
		</div>
	);
};

export default Message;
