import s from './BestFriends.module.css';

const BestFriendItem = (props) => {
	return (
		<div className={s.item}>
			<img
				className={s.avatar}
				src="https://img2.freepng.ru/20180319/pde/kisspng-computer-icons-icon-design-avatar-flat-face-icon-5ab06e33bee962.122118601521511987782.jpg"
			></img>
		</div>
	);
};

const BestFriends = () => {
	return (
		<div className={s.bestFriends}>
			<h4 className={s.header}>Best Friends</h4>
			<div className={s.friendItems}>
				<BestFriendItem />
				<BestFriendItem />
				<BestFriendItem />
			</div>
		</div>
	);
};

export default BestFriends;
