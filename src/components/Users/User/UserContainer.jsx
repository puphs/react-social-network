import React from 'react';
import User from './User';
import { setFollowUser } from '../../../redux/usersReducer';
import { connect } from 'react-redux';
import usersApi from '../../../api/api';

class UserContainer extends React.Component {
	followUser = (userId) => {
		this.props.setFollowUser(userId, true);
		// this.props.followUser(userId);
	};

	unfollowUser = (userId) => {
		this.props.setFollowUser(userId, false);
	};

	render() {
		return (
			<User
				user={this.props.user}
				followUser={this.followUser}
				unfollowUser={this.unfollowUser}
				setFollowingInProgressUser={this.props.setFollowingInProgressUser}
				followingInProgressUsers={this.props.followingInProgressUsers}
			/>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		user: props.user,
		followingInProgressUsers: state.usersPage.followingInProgressUsers,
	};
};

export default connect(mapStateToProps, { setFollowUser })(UserContainer);
