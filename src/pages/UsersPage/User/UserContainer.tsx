import React from 'react';
import User from './User';
import { followUser, unfollowUser } from '../../../redux/usersReducer';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/reduxStore';
import { UserType } from '../../../types/types';

type OwnPropsType = {
	user: UserType;
};

type MapStatePropsType = {
	followingInProgressUsers: Set<number>;
	isAuth: boolean;
};

type MapDispatchPropsType = {
	followUser: (userId: number) => void;
	unfollowUser: (userId: number) => void;
};

type PropsType = OwnPropsType & MapStatePropsType & MapDispatchPropsType;

class UserContainer extends React.Component<PropsType> {
	render() {
		return (
			<User
				user={this.props.user}
				followUser={this.props.followUser}
				unfollowUser={this.props.unfollowUser}
				followingInProgressUsers={this.props.followingInProgressUsers}
				isAuth={this.props.isAuth}
			/>
		);
	}
}

const mapStateToProps = (state: AppStateType, props: OwnPropsType) => {
	return {
		user: props.user,
		followingInProgressUsers: state.usersPage.followingInProgressUsers,
		isAuth: state.auth.isAuth,
	};
};

export default connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
	mapStateToProps,
	{ followUser, unfollowUser }
)(UserContainer);
