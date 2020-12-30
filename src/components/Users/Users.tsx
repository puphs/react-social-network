import s from './Users.module.css';
import UserContainer from './User/UserContainer';
import Pagination from '../Pagination/Pagination';
import { UserType } from '../../types/types';

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

export default Users;
