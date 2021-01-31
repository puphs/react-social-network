import React from 'react';
import { actions } from '../../redux/dialogsReducer';
import DialogsPage from './DialogsPage';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../../components/hoc/withAuthRedirect';
import { compose } from 'redux';
import { Redirect, RouteComponentProps, withRouter } from 'react-router-dom';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
	addMessage: (message: string) => void;
	setCurrentDialog: (dialog: number) => void;
};

type LocationParamsProps = {
	dialog: string;
};
class DialogsContainer extends React.Component<
	MapStatePropsType & MapDispatchPropsType & RouteComponentProps<LocationParamsProps>
> {
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

	getDialogFromParamsOrNull = (): number | null => {
		let dialog = parseInt(this.props.match.params.dialog);
		if (isNaN(dialog)) return null;
		return dialog;
	};

	setCurrentDialog = (dialog: number) => {
		this.props.setCurrentDialog(dialog);
		// this.props.startChatting(dialog);
	};

	render() {
		if (this.props.match.params.dialog === undefined)
			return <Redirect to={`/dialogs/${this.props.currentDialog}`} />;
		return <DialogsPage {...this.props} />;
	}
}

const mapStateToProps = (state: AppStateType) => {
	return {
		dialogs: state.dialogsPage.dialogs,
		messages: state.dialogsPage.messages,
		currentDialog: state.dialogsPage.currentDialog,
	};
};

export default compose<React.ComponentType>(
	connect(mapStateToProps, {
		addMessage: actions.addMessage,
		setCurrentDialog: actions.setCurrentDialog,
		// loadDialogs,
		// startChatting,
	}),
	withRouter,
	withAuthRedirect
)(DialogsContainer);
