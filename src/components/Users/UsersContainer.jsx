import { connect } from 'react-redux';
import Users from './Users';
import Axios from 'axios';
import React from 'react';
import Preloader from './../Preloader/Preloader';

import {
	followUserToggleCreator,
	setCurrentPageCreator,
	setTotalUsersCountCreator,
	setUsersCreator,
} from '../../redux/usersReducer';

class UsersContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.getUsers(this.props.currentPage, this.props.pageSize).then((response) => {
			this.props.setUsers(response.data.items);
			this.props.setTotalUsersCount(response.data.totalCount);
		});
	}

	componentDidUpdate() {
		// console.log('component update :>> ');
	}

	getUsers = (page, count) => {
		return Axios.get(
			`https://social-network.samuraijs.com/api/1.0/users?page=${page}&count=${count}`
		);
	};

	setCurrentPage = (page) => {
		this.getUsers(page, this.props.pageSize).then((response) => {
			this.props.setUsers(response.data.items);
		});
		this.props.setCurrentPage(page);
	};

	render() {
		return (
			<>
				{this.props.isFetching && <Preloader />}
				<Users
					users={this.props.users}
					totalUsersCount={this.props.totalUsersCount}
					pageSize={this.props.pageSize}
					currentPage={this.props.currentPage}
					setCurrentPage={this.setCurrentPage}
				/>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleFollowUser: (userId) => {
			dispatch(followUserToggleCreator(userId));
		},
		setUsers: (users) => {
			dispatch(setUsersCreator(users));
		},
		setCurrentPage: (page) => {
			dispatch(setCurrentPageCreator(page));
		},
		setTotalUsersCount: (count) => {
			dispatch(setTotalUsersCountCreator(count));
		},
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);
