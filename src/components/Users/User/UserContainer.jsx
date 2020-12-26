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
				followingInProgressUsers={this.props.followingInProgressUsers}
				isAuth={this.props.isAuth}
			/>
		);
	}
}

const mapStateToProps = (state, props) => {
	return {
		user: props.user,
		followingInProgressUsers: state.usersPage.followingInProgressUsers,
		isAuth: state.auth.isAuth,
	};
};

export default connect(mapStateToProps, { followUser, unfollowUser })(UserContainer);
