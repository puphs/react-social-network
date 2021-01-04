import React from 'react';
import { actions } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

class DialogsContainer extends React.Component {
	componentDidMount() {
		// this.props.loadDialogs();

		const dialog = this.getDialogFromParamsOrNull() ?? 1;
		this.setCurrentDialog(dialog);
	}

	componentDidUpdate() {
		const dialog = this.getDialogFromParamsOrNull() ?? 1;
		if (dialog !== this.props.currentDialog) {
			this.setCurrentDialog(dialog);
		}
	}

	getDialogFromParamsOrNull = () => {
		let dialog = parseInt(this.props.match.params.dialog);
		if (isNaN(dialog)) return null;
		return dialog;
	};

	setCurrentDialog = (dialog) => {
		this.props.setCurrentDialog(dialog);
		// this.props.startChatting(dialog);
	};

	render() {
		if (this.props.match.params.dialog == undefined)
			return <Redirect to={`/dialogs/${this.props.currentDialog}`} />;
		return <Dialogs {...this.props} />;
	}
}

const mapStateToProps = (state) => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
		currentDialog: state.dialogsPage.currentDialog,
	};
};

export default compose(
	connect(mapStateToProps, {
		addMessage: actions.addMessage,
		setCurrentDialog: actions.setCurrentDialog,
		// loadDialogs,
		// startChatting,
	}),
	withRouter,
	withAuthRedirect
)(DialogsContainer);
