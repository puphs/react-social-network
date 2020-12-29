import React from 'react';
import { addMessage, setCurrentDialog } from '../../redux/dialogsReducer';
import Dialogs from './Dialogs';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';
import { Redirect, withRouter } from 'react-router-dom';

class DialogsContainer extends React.Component {
	componentDidMount() {
		const dialog = this.getDialogFromParamsOrNull() ?? 1;
		this.props.setCurrentDialog(dialog);
	}

	componentDidUpdate() {
		const dialog = this.getDialogFromParamsOrNull() ?? 1;
		if (dialog !== this.props.currentDialog) {
			this.props.setCurrentDialog(dialog);
		}
	}

	getDialogFromParamsOrNull = () => {
		let dialog = parseInt(this.props.match.params.dialog);
		if (isNaN(dialog)) return null;
		return dialog;
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
		addMessage,
		setCurrentDialog,
	}),
	withRouter,
	withAuthRedirect
)(DialogsContainer);
