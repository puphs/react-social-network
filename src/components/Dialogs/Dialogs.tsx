import React from 'react';
import s from './Dialogs.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, InjectedFormProps } from 'redux-form';
import cn from 'classnames';
import withFormReset from '../hoc/withFormReset';
import { DialogType, MessageType } from '../../types/types';

type AddMessageFormValuesType = {
	messageText: string;
};

const AddMessageForm: React.FC<InjectedFormProps<AddMessageFormValuesType>> = ({
	handleSubmit,
}) => {
	return (
		<form onSubmit={handleSubmit}>
			<Field
				className={cn(s.messageTextArea, 'inputBase')}
				name={'messageText'}
				placeholder="Write a message..."
				component={'textarea'}
			/>

			<button className={cn(s.sendBtn, 'btnBase')} name={'addMessageButton'}>
				send
			</button>
		</form>
	);
};

type PropsType = {
	dialogs: Array<DialogType>;
	messages: Array<MessageType>;
	addMessage: (messageText: string) => void;
};

const Dialogs: React.FC<PropsType> = ({ dialogs, messages, addMessage }) => {
	let dialogElements = dialogs.map((data) => (
		<DialogItem key={data.id} name={data.name} id={data.id} />
	));
	let messageElements = messages.map((data) => <Message key={data.id} message={data.message} />);

	const shouldResetForm = (formData: AddMessageFormValuesType) => {
		return formData.messageText !== '' && formData.messageText.trim() !== '';
	};

	const onMessageSubmit = (formData: AddMessageFormValuesType) => {
		if (formData.messageText && formData.messageText.trim()) addMessage(formData.messageText);
	};

	return (
		<main className={s.dialogs}>
			<div className={s.dialogItems}>{dialogElements}</div>
			<div className={s.dialogContainer}>
				<div className={s.messages}>{messageElements}</div>
				{withFormReset<AddMessageFormValuesType>(
					AddMessageForm,
					'addMessage',
					onMessageSubmit,
					shouldResetForm
				)}
			</div>
		</main>
	);
};

export default Dialogs;
