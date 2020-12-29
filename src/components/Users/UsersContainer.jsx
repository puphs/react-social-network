import { connect } from 'react-redux';
import Users from './Users';
import React, { memo } from 'react';
import Preloader from './../Preloader/Preloader';

import { setCurrentPage, loadUsers } from '../../redux/usersReducer';
import { compose } from 'redux';
import {
	getCurrentPage,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsers,
} from '../../redux/usersSelectors';
import { Redirect, withRouter } from 'react-router-dom';

class UsersContainer extends React.Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.setCurrentPage(
			this.getPageFromLocationOrNull(this.props.location) ?? this.props.currentPage
		);
	}

	componentDidUpdate(prevProps) {
		const page = this.getPageFromLocationOrNull(this.props.location) ?? 1;
		if (page !== this.props.currentPage) this.setCurrentPage(page);
	}

	getPageFromLocationOrNull = () => {
		let page = parseInt(new URLSearchParams(this.props.location.search).get('page'));
		if (isNaN(page) || !page) return null;
		return page;
	};

	setCurrentPage = (page) => {
		this.props.setCurrentPage(page);
		this.props.loadUsers(page, this.props.pageSize);
	};

	render() {
		if (this.props.isFetching) {
			return <Preloader />;
		}
		if (!this.getPageFromLocationOrNull(this.props.location)) {
			return <Redirect to={`/users?page=${this.props.currentPage}`} />;
		}
		return (
			<Users
				users={this.props.users}
				totalUsersCount={this.props.totalUsersCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
				setCurrentPage={this.setCurrentPage}
			/>
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
	}),
	withRouter,
	memo
)(UsersContainer);
