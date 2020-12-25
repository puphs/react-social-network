import React from 'react';
import { connect } from 'react-redux';
import { loadProfile, getStatus, updateStatus } from '../../redux/profileReducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
	componentDidMount() {
		const userId = this.props.match.params.userId ?? this.props.authorizedUserId;
		this.props.loadProfile(userId);
		this.props.getStatus(userId);
	}

	render() {
		return (
			<Profile
				profile={this.props.profile}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
			/>
		);
	}
}

const mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.id,
});

export default compose(
	connect(mapStateToProps, { loadProfile, getStatus, updateStatus }),
	withRouter,
	withAuthRedirect
)(ProfileContainer);
