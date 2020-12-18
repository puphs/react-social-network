import React from 'react';
import { addMessageCreator, updateNewMessageTextCreator } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';

// const DialogsContainers = (props) => {
// 	return (
// 		<StoreContext.Consumer>
// 			{(store) => {
// 				const state = props.store.getState();

// 				const addMessage = () => {};
// 				const updateNewMessageText = (text) => {};

// 				return <Dialogs updateNewMessageText={updateNewMessageText} addMessage={addMessage} />;
// 			}}
// 		</StoreContext.Consumer>
// 	);
// };

const mapStateToProps = (state) => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
		newMessageText: state.dialogsPage.newMessageText,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		addMessage: () => {
			dispatch(addMessageCreator());
		},
		updateNewMessageText: (text) => {
			dispatch(updateNewMessageTextCreator(text));
		},
	};
};

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;
