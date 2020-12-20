import s from './Users.module.css';
import UserContainer from './User/UserContainer';

const Users = (props) => {
	const userElements = props.users.map((user) => <UserContainer user={user} />);
	const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
	let pages = [];
	for (let i = 1; i <= pagesCount; i++) {
		pages.push(i);
	}
	const pagesElements = pages.map((pageIndex) => (
		<div
			className={s.page + ' ' + (props.currentPage === pageIndex && s.page_active)}
			onClick={() => props.setCurrentPage(pageIndex)}
		>
			{pageIndex}
		</div>
	));
	return (
		<div className={s.container}>
			<div className={s.users}>
				{/* <button onClick={loadUsers}>Get users</button> */}
				{userElements}
			</div>
			<div className={s.pagination}>{pagesElements}</div>
		</div>
	);
};

export default Users;
