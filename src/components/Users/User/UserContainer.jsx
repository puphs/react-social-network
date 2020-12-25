import React from 'react';
import User from './User';
import { followUser, unfollowUser } from '../../../redux/usersReducer';
import { connect } from 'react-redux';

class UserContainer extends React.Component {
	followUser = (userId) => {
		this.props.followUser(userId);
		// this.props.followUser(userId);
	};

	unfollowUser = (userId) => {
		this.props.unfollowUser(userId);
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

export default connect(mapStateToProps, { followUser, unfollowUser })(UserContainer);
