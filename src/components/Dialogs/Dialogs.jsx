import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, reduxForm } from 'redux-form';
import cn from 'classnames';
import withFormReset from '../hoc/withFormReset';

const AddMessageForm = ({ handleSubmit }) => {
	return (
		<form onSubmit={handleSubmit}>
			<Field
				className={cn(s.messageTextArea, 'inputBase')}
				name={'messageText'}
				placeholder="Write a message..."
				// value={newMessageText}
				component={'textarea'}
			/>

			<button className={cn(s.sendBtn, 'btnBase')} name={'addMessageButton'}>
				send
			</button>
		</form>
	);
};

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
				{withFormReset(AddMessageForm, 'addMessage', onMessageSubmit)}
			</div>
		</main>
	);
};

export default Dialogs;
