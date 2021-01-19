import { connect } from 'react-redux';
import Users from './Users';
import React, { memo } from 'react';
import Preloader from '../Preloader/Preloader';

import { actions, loadUsers } from '../../redux/usersReducer';
import { compose } from 'redux';
import {
	getCurrentPage,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsers,
} from '../../redux/usersSelectors';
import { Redirect, withRouter } from 'react-router-dom';
import { UserType } from '../../types/types';
import { AppStateType } from '../../redux/reduxStore';

type MapStatePropsType = {
	users: Array<UserType>;
	pageSize: number;
	totalUsersCount: number;
	currentPage: number;
	isFetching: boolean;
};

type OwnPropsType = {};

type MapDispatchPropsType = {
	setCurrentPage: (page: number) => void;
	loadUsers: (currentPage: number, pageSize: number) => void;
};

type OtherPropsType = {
	location: Location;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType & OtherPropsType;

class UsersContainer extends React.Component<PropsType> {
	componentDidMount() {
		this.setCurrentPage(this.getPageFromLocationOrNull() ?? this.props.currentPage);
	}

	componentDidUpdate() {
		const page = this.getPageFromLocationOrNull() ?? 1;
		if (page !== this.props.currentPage) this.setCurrentPage(page);
	}

	getPageFromLocationOrNull = (): number | null => {
		const searchParams = new URLSearchParams(this.props.location.search);
		if (searchParams.has('page')) {
			let page = parseInt(searchParams.get('page')!);
			if (typeof page === 'number') return page;
		}
		return null;
	};

	setCurrentPage = (page: number) => {
		this.props.setCurrentPage(page);
		this.props.loadUsers(page, this.props.pageSize);
	};

	render() {
		if (this.props.isFetching) {
			return <Preloader />;
		}
		if (!this.getPageFromLocationOrNull()) {
			return <Redirect to={`/users?page=${this.props.currentPage}`} />;
		}
		return (
			<Users
				users={this.props.users}
				totalUsersCount={this.props.totalUsersCount}
				pageSize={this.props.pageSize}
				currentPage={this.props.currentPage}
			/>
		);
	}
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => {
	return {
		users: getUsers(state),
		pageSize: getPageSize(state),
		totalUsersCount: getTotalUsersCount(state),
		currentPage: getCurrentPage(state),
		isFetching: getIsFetching(state),
	};
};

export default compose<React.ComponentType>(
	connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(mapStateToProps, {
		setCurrentPage: actions.setCurrentPage,
		loadUsers,
	}),
	withRouter,
	memo
)(UsersContainer);
