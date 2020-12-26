import s from './BestFriends.module.css';
import userPhoto from '../../assets/images/user-photo.png';

const BestFriendItem = (props) => {
	return (
		<div className={s.item}>
			<img className={s.avatar} src={userPhoto}></img>
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
