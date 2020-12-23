import { connect } from 'react-redux';
import Users from './Users';
import React from 'react';
import Preloader from './../Preloader/Preloader';

import { setCurrentPage, getUsers } from '../../redux/usersReducer';
import { compose } from 'redux';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

class UsersContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.getUsers(this.props.currentPage, this.props.pageSize);
	}

	componentDidUpdate() {}

	setCurrentPage = (page) => {
		this.props.setCurrentPage(page);
		this.props.getUsers(page, this.props.pageSize);
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
		users: state.usersPage.users,
		pageSize: state.usersPage.pageSize,
		totalUsersCount: state.usersPage.totalUsersCount,
		currentPage: state.usersPage.currentPage,
		isFetching: state.usersPage.isFetching,
	};
};
connect(mapStateToProps, {
	setCurrentPage,
	getUsers,
})(UsersContainer);
export default compose(
	connect(mapStateToProps, {
		setCurrentPage,
		getUsers,
	}),
	withAuthRedirect
)(UsersContainer);
