import React from 'react';
import { addMessage, updateNewMessageText } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

const mapStateToProps = (state) => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
		newMessageText: state.dialogsPage.newMessageText,
	};
};

export default connect(mapStateToProps, {
	addMessage,
	updateNewMessageText,
})(withAuthRedirect(Dialogs));
