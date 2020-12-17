import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
	let dialogElements = props.dialogs.map((data) => <DialogItem name={data.name} id={data.id} />);
	let messageElements = props.messages.map((data) => <Message message={data.message} />);

	const messageInputElementRef = React.createRef();
	const onAddMessage = () => {
		props.addMessage();
	};

	const onUpdateNewMessageText = (e) => {
		props.updateNewMessageText(e.target.value);
	};

	return (
		<main className={s.dialogs}>
			<div className={s.dialogItems}>{dialogElements}</div>
			<div className={s.dialogContainer}>
				<div className={s.messages}>{messageElements}</div>
				<textarea
					className={s.messageTextArea + ' ' + 'textAreaBase'}
					placeholder="Write a message..."
					ref={messageInputElementRef}
					value={props.newMessageText}
					onChange={onUpdateNewMessageText}
				></textarea>
				<button className={s.sendBtn + ' ' + 'btnBase'} onClick={onAddMessage}>
					send
				</button>
			</div>
		</main>
	);
};

export default Dialogs;
