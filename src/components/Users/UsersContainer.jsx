import { connect } from 'react-redux';
import Users from './Users';
import React from 'react';
import Preloader from './../Preloader/Preloader';

import { setCurrentPage, loadUsers } from '../../redux/usersReducer';
import { compose } from 'redux';
import {
	getCurrentPage,
	getFilteredUsers,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsers,
} from '../../redux/usersSelectors';

class UsersContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.loadUsers(this.props.currentPage, this.props.pageSize);
	}

	componentDidUpdate() {}

	setCurrentPage = (page) => {
		this.props.setCurrentPage(page);
		this.props.loadUsers(page, this.props.pageSize);
	};

	render() {
		return (
			<>
				{this.props.isFetching ? (
					<Preloader />
				) : (
					<Users
						users={this.props.users}
						totalUsersCount={this.props.totalUsersCount}
						pageSize={this.props.pageSize}
						currentPage={this.props.currentPage}
						setCurrentPage={this.setCurrentPage}
					/>
				)}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
	};
};
export default compose(
	connect(mapStateToProps, {
		setCurrentPage,
		loadUsers,
	})
)(UsersContainer);
