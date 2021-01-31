import React, { useEffect, useState } from 'react';
import s from './DialogsPage.module.css';
import DialogItem from './DialogItem/DialogItem';
import Message from './Message/Message';
import { Field, InjectedFormProps } from 'redux-form';
import cn from 'classnames';
import withFormReset from '../../components/hoc/withFormReset';
import { DialogType, MessageType } from '../../types/types';

type AddMessageFormValuesType = {
	messageText: string;
};

type AddMessageFormProps = {
	IsButtonDisabled: boolean;
};

const AddMessageForm: React.FC<
	AddMessageFormProps & InjectedFormProps<AddMessageFormValuesType>
> = ({ handleSubmit }) => {
	return (
		<form onSubmit={handleSubmit}>
			<Field
				className={cn(s.messageTextArea, 'inputBase')}
				name={'messageText'}
				placeholder="Write a message..."
				component={'textarea'}
			/>

			<button className={cn(s.sendBtn, 'btnBase')} name={'addMessageButton'} disabled={true}>
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

const ws = new WebSocket('wss://social-network.samuraijs.com/handlers/ChatHandler.ashx');

const DialogsPage: React.FC<PropsType> = ({ dialogs, addMessage }) => {
	const [messages, setMessages] = useState<Array<MessageType>>([]);

	useEffect(() => {
		ws.addEventListener('message', (e: MessageEvent) => {
			const newMessages = JSON.parse(e.data) as Array<MessageType>;
			setMessages((oldMessages) => [...oldMessages, ...newMessages]);
		});
		return () => {};
	}, []);

	let dialogElements = dialogs.map((data) => (
		<DialogItem key={data.id} name={data.name} id={data.id} />
	));
	let messageElements = messages.map((message) => <Message message={message} />);

	const shouldResetForm = (formData: AddMessageFormValuesType) => {
		return formData.messageText !== '' && formData.messageText.trim() !== '';
	};

	const onMessageSubmit = (formData: AddMessageFormValuesType) => {
		// if (formData.messageText && formData.messageText.trim()) addMessage(formData.messageText);
		ws.send(formData.messageText);
	};

	return (
		<main className={s.dialogs}>
			<div className={s.dialogItems}>{dialogElements}</div>
			<div className={s.messagesContainer}>
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

export default DialogsPage;
