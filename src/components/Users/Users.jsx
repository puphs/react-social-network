import s from './Users.module.css';
import UserContainer from './User/UserContainer';
import Pagination from '../Pagination/Pagination';

const Users = ({ users, currentPage, totalUsersCount, pageSize, setCurrentPage }) => {
	const userElements = users.map((user) => <UserContainer user={user} key={user.id} />);
	return (
		<div className={s.container}>
			<div className={s.users}>{userElements}</div>
			<Pagination
				currentPage={currentPage}
				totalPagesCount={Math.ceil(totalUsersCount / pageSize)}
				setCurrentPage={setCurrentPage}
				maxVisiblePagesCount={9}
				basePath={'users?page='}
			/>
		</div>
	);
};

export default Users;
