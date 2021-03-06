import React from 'react';
import { connect } from 'react-redux';
import {
	loadProfile,
	getStatus,
	updateStatus,
	updateAvatar,
	updateProfile,
} from '../../redux/profileReducer';
import ProfilePage from './ProfilePage';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../../components/hoc/withAuthRedirect';
import { compose } from 'redux';
import { AppStateType } from '../../redux/reduxStore';
import { ProfileType } from '../../types/types';
import Preloader from '../../components/Preloader/Preloader';

type MapStatePropsType = ReturnType<typeof mapStateToProps>;
type MapDispatchPropsType = {
	loadProfile: (userId: number) => void;
	getStatus: (userId: number) => void;
	updateStatus: (status: string) => void;
	updateAvatar: (avatar: File) => void;
	updateProfile: (profile: ProfileType) => void;
};

type LocationParamsProps = {
	userId: string;
};

type PropsType = MapStatePropsType &
	MapDispatchPropsType &
	RouteComponentProps<LocationParamsProps>;

class ProfileContainer extends React.Component<PropsType> {
	updateProfile = () => {
		const userIdOrNaN = parseInt(this.props.match.params.userId);
		const userId = isNaN(userIdOrNaN) ? this.props.authorizedUserId : userIdOrNaN;
		this.props.loadProfile(userId);
		this.props.getStatus(userId);
	};

	componentDidMount() {
		this.updateProfile();
	}

	componentDidUpdate(prevProps: PropsType) {
		if (prevProps.match.params.userId !== this.props.match.params.userId) {
			this.updateProfile();
		}
	}

	render() {
		if (this.props.isFetching) return <Preloader />;
		return (
			<ProfilePage
				profile={this.props.profile}
				status={this.props.status}
				updateStatus={this.props.updateStatus}
				updateAvatar={this.props.updateAvatar}
				updateProfile={this.props.updateProfile}
				isMyProfile={this.props.authorizedUserId === this.props?.profile?.userId}
			/>
		);
	}
}

const mapStateToProps = (state: AppStateType) => ({
	profile: state.profilePage.profile,
	status: state.profilePage.status,
	authorizedUserId: state.auth.id as number, // we can't access Profile without athorization
	isFetching: state.profilePage.isFetching,
});

export default compose(
	connect(mapStateToProps, { loadProfile, getStatus, updateStatus, updateAvatar, updateProfile }),
	withRouter,
	withAuthRedirect
)(ProfileContainer);
