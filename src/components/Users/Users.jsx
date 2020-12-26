import s from './Users.module.css';
import UserContainer from './User/UserContainer';
import Pagination from '../Pagination/Pagination';

const Users = ({ users, currentPage, totalUsersCount, pageSize, setCurrentPage }) => {
	const userElements = users.map((user) => <UserContainer user={user} />);
	return (
		<div className={s.container}>
			<div className={s.users}>{userElements}</div>
			<Pagination
				currentPage={currentPage}
				totalPagesCount={Math.ceil(totalUsersCount / pageSize)}
				setCurrentPage={setCurrentPage}
				maxVisiblePagesCount={9}
			/>
		</div>
	);
};

export default Users;
