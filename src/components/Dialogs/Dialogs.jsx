import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';

const AddMessageForm = ({ handleSubmit, newMessageText }) => {
	return (
		<form onSubmit={handleSubmit}>
			<Field
				className={s.messageTextArea + ' ' + 'inputBase'}
				name={'messageText'}
				placeholder="Write a message..."
				// value={newMessageText}
				component={'textarea'}
			/>

			<button className={s.sendBtn + ' ' + 'btnBase'} name={'addMessageButton'}>
				send
			</button>
		</form>
	);
};

const AddMessageReduxForm = reduxForm({ form: 'addMessage' })(AddMessageForm);

const Dialogs = ({ dialogs, messages, addMessage }) => {
	let dialogElements = dialogs.map((data) => (
		<DialogItem key={data.id} name={data.name} id={data.id} />
	));
	let messageElements = messages.map((data) => <Message key={data.id} message={data.message} />);

	const onMessageSubmit = (formData) => {
		addMessage(formData.messageText);
	};

	return (
		<main className={s.dialogs}>
			<div className={s.dialogItems}>{dialogElements}</div>
			<div className={s.dialogContainer}>
				<div className={s.messages}>{messageElements}</div>
				<AddMessageReduxForm onSubmit={onMessageSubmit} />
			</div>
		</main>
	);
};

export default Dialogs;
