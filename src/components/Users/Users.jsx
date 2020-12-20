import s from './Users.module.css';
import UserContainer from './User/UserContainer';
import Pagination from '../Pagination/Pagination';

const Users = (props) => {
	const userElements = props.users.map((user) => <UserContainer user={user} />);

	return (
		<div className={s.container}>
			<div className={s.users}>
				{/* <button onClick={loadUsers}>Get users</button> */}
				{userElements}
			</div>
			<Pagination
				currentPage={props.currentPage}
				totalPagesCount={Math.ceil(props.totalUsersCount / props.pageSize)}
				setCurrentPage={props.setCurrentPage}
				maxVisiblePagesCount={9}
			/>
		</div>
	);
};

export default Users;
