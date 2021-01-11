import s from './BestFriends.module.css';
import userPhoto from '../../../assets/images/user-photo.png';

const BestFriendItem: React.FC = () => {
	return (
		<div className={s.item}>
			<img className={s.avatar} src={userPhoto} alt={'user'}></img>
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
