import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';

const Dialogs = (props) => {
	const dialogs = props.dialogsPage?.dialogs ?? [];
	const messages = props.dialogsPage?.messages ?? [];

	let dialogElements = dialogs.map((data) => <DialogItem name={data.name} id={data.id} />);
	let messageElements = messages.map((data) => <Message message={data.message} />);

	const messageInputElementRef = React.createRef();
	const addMessage = () => {
		props.addMessage();
	};

	const updateNewMessageText = () => {
		const text = messageInputElementRef.current.value;
		props.updateNewMessageText(text);
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
					value={props.dialogsPage.newMessageText}
					onChange={updateNewMessageText}
				></textarea>
				<button className={s.sendBtn + ' ' + 'btnBase'} onClick={addMessage}>
					send
				</button>
			</div>
		</main>
	);
};

export default Dialogs;
