import React from 'react';
import { addMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogsReducer';
import StoreContext from '../../StoreContext';
import Dialogs from './Dialogs';

const DialogsContainer = (props) => {
	return (
		<StoreContext.Consumer>
			{(store) => {
				const state = store.getState();

				const addMessage = () => {
					store.dispatch(addMessageCreator());
				};
				const updateNewMessageText = (text) => {
					store.dispatch(updateNewMessageTextCreator(text));
				};

				return (
					<Dialogs
						updateNewMessageText={updateNewMessageText}
						addMessage={addMessage}
						dialogs={state.dialogsPage.dialogs}
						messages={state.dialogsPage.messages}
						newMessageText={state.dialogsPage.newMessageText}
					/>
				);
			}}
		</StoreContext.Consumer>
	);
};

export default DialogsContainer;
