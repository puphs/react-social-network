import s from './Users.module.css';
import UserContainer from './User/UserContainer';
import Pagination from '../Pagination/Pagination';
import { UserType } from '../../types/types';
import { Field, Form, Formik, FormikHelpers } from 'formik';

type PropsType = {
	users: Array<UserType>;
	currentPage: number;
	totalUsersCount: number;
	pageSize: number;
};

const Users: React.FC<PropsType> = ({ users, currentPage, totalUsersCount, pageSize }) => {
	const userElements = users.map((user) => <UserContainer user={user} key={user.id} />);
	return (
		<div className={s.container}>
			<UsersSearchForm />
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

type UsersSearchFormValuesType = {
	searchQuery: string;
	friendsOnly: boolean;
};

const UsersSearchForm = () => {
	const onSubmit = (
		values: UsersSearchFormValuesType,
		{ setSubmitting }: FormikHelpers<UsersSearchFormValuesType>
	) => {
		console.log(values);
		setSubmitting(false);
	};
	return (
		<Formik initialValues={{ searchQuery: '', friendsOnly: false }} onSubmit={onSubmit}>
			{() => (
				<Form className={s.searchForm}>
					<Field placeholder={'Search with name'} className={s.searchInput} name={'searchQuery'} />
					<Field
						className={s.friendsOnlyInput}
						id={'friendsOnly'}
						name={'friendsOnly'}
						type={'checkbox'}
					/>
					<label className={s.friendsOnlyLabel} htmlFor={'friendsOnly'}>
						Friends only
					</label>
				</Form>
			)}
		</Formik>
	);
};

export default Users;
