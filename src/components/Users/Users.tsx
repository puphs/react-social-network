import s from './Users.module.css';
import UserContainer from './User/UserContainer';
import Pagination from '../Pagination/Pagination';
import { UserType } from '../../types/types';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { actions, loadUsers, UsersFilterType } from '../../redux/usersReducer';
import { useDispatch, useSelector } from 'react-redux';
import {
	getCurrentPage,
	getIsFetching,
	getPageSize,
	getTotalUsersCount,
	getUsers,
	getUsersFilter,
} from '../../redux/usersSelectors';
import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Preloader from '../Preloader/Preloader';

const Users = () => {
	const users = useSelector(getUsers);
	const currentPage = useSelector(getCurrentPage);
	const totalUsersCount = useSelector(getTotalUsersCount);
	const pageSize = useSelector(getPageSize);
	const usersFilter = useSelector(getUsersFilter);
	const isFetching = useSelector(getIsFetching);

	const dispatch = useDispatch();
	const history = useHistory();

	useEffect(() => {
		const page = getPageFromSearchOrNull(history.location.search) || currentPage || 1;
		const filter = getUsersFilterFromSearch(history.location.search);

		dispatch(actions.setCurrentPage(page));
		dispatch(actions.setUsersFilter(filter));
	}, [history.location.search]);

	useEffect(() => {
		// debugger;
		history.push({
			search: new URLSearchParams({
				page: currentPage.toString(),
				search: usersFilter.searchQuery,
				friend: convertFriendToString(usersFilter.friend),
			}).toString(),
		});
	}, [currentPage, usersFilter]);

	useEffect(() => {
		dispatch(loadUsers(currentPage, pageSize, usersFilter));
	}, [currentPage, usersFilter]);

	// useEffect(() => {
	// 	dispatch(actions.setCurrentPage(getPageFromLocation()));
	// }, [location]);

	const getPageFromSearchOrNull = (search: string) => {
		const page = parseInt(new URLSearchParams(search).get('page') || '');
		return isNaN(page) ? null : page;
	};

	const getUsersFilterFromSearch = (search: string): UsersFilterType => {
		const searchParams = new URLSearchParams(search);
		return {
			searchQuery: searchParams.get('search') ?? '',
			friend: convertStringToFriend(searchParams.get('friend') ?? 'null'),
		};
	};

	const onUsersSearchFormSubmit = (filter: UsersFilterType) => {
		dispatch(actions.setUsersFilter(filter));
	};

	const userElements = users.map((user) => <UserContainer user={user} key={user.id} />);

	if (isFetching) {
		return <Preloader />;
	}
	return (
		<div className={s.container}>
			<UsersFilterForm
				onUsersSearchFormSubmit={onUsersSearchFormSubmit}
				initialValues={{
					searchQuery: usersFilter.searchQuery,
					friend: convertFriendToString(usersFilter.friend),
				}}
			/>
			<div className={s.users}>{userElements}</div>
			<Pagination
				currentPage={currentPage}
				totalPagesCount={Math.ceil(totalUsersCount / pageSize)}
				maxVisiblePagesCount={9}
				basePath={'users?page='}
			/>
		</div>
	);
};

type FriendType = boolean | null;
const convertFriendToString = (friend: FriendType) =>
	friend === null ? 'null' : friend === true ? 'true' : 'false';

const convertStringToFriend = (friend: string) =>
	friend === 'true' ? true : friend === 'false' ? false : null;

type UsersSearchFormSubmitValuesType = {
	searchQuery: string;
	friend: string;
};

type UsersFilterFormPropsType = {
	onUsersSearchFormSubmit: (values: UsersFilterType) => void;
	initialValues: UsersSearchFormSubmitValuesType;
};
const UsersFilterForm: React.FC<UsersFilterFormPropsType> = ({
	onUsersSearchFormSubmit,
	initialValues,
}) => {
	const onSubmit = (
		values: UsersSearchFormSubmitValuesType,
		{ setSubmitting }: FormikHelpers<UsersSearchFormSubmitValuesType>
	) => {
		const filter: UsersFilterType = {
			searchQuery: values.searchQuery,
			friend: convertStringToFriend(values.friend),
		};
		onUsersSearchFormSubmit(filter);
		setSubmitting(false);
	};
	return (
		<Formik initialValues={initialValues} onSubmit={onSubmit}>
			{() => (
				<Form className={s.searchForm}>
					<Field placeholder={'Search with name'} className={s.searchInput} name={'searchQuery'} />
					<Field className={s.friendSelect} as={'select'} name={'friend'}>
						<option value={'null'}>All</option>
						<option value={'true'}>Followed</option>
						<option value={'false'}>Not followed</option>
					</Field>
				</Form>
			)}
		</Formik>
	);
};

export default Users;
