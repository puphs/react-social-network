import React from 'react';
import { connect } from 'react-redux';
import { loadProfile, getStatus, updateStatus, updateAvatar } from '../../redux/profileReducer';
import Profile from './Profile';
import { withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/withAuthRedirect';
import { compose } from 'redux';

class ProfileContainer extends React.Component {
	updateProfile = () => {
		const userId = this.props.match.params.userId ?? this.props.authorizedUserId;
		this.props.loadProfile(userId);
		this.props.getStatus(userId);
	};

	componentDidMount() {
		this.updateProfile();
	}

	componentDidUpdate(prevProps, prevState) {
		if (prevProps.match.params.userId !== this.props.match.params.userId) {
			this.updateProfile();
		}
	}

	render() {
		return (
			<Profile
				profile={this.props.profile}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
				updateAvatar={this.props.updateAvatar}
				isMyProfile={this.props.authorizedUserId === this.props?.profile?.userId}
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
	connect(mapStateToProps, { loadProfile, getStatus, updateStatus, updateAvatar }),
	withRouter,
	withAuthRedirect
)(ProfileContainer);
