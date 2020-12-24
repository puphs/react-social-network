import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';

const AddMessageForm = (props) => {
	return (
		<form onSubmit={props.handleSubmit}>
			<Field
				className={s.messageTextArea + ' ' + 'inputBase'}
				name={'messageText'}
				placeholder="Write a message..."
				value={props.newMessageText}
				component={'textarea'}
			/>

			<button className={s.sendBtn + ' ' + 'btnBase'} name={'addMessageButton'}>
				send
			</button>
		</form>
	);
};

const AddMessageReduxForm = reduxForm({ form: 'addMessage' })(AddMessageForm);

const Dialogs = (props) => {
	let dialogElements = props.dialogs.map((data) => (
		<DialogItem key={data.id} name={data.name} id={data.id} />
	));
	let messageElements = props.messages.map((data) => (
		<Message key={data.id} message={data.message} />
	));

	const onMessageSubmit = (formData) => {
		console.log(formData.messageText);
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
