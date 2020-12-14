import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo';

const Profile = () => {
	return (
		<main className={s.profile}>
			<ProfileInfo />
			<MyPosts />
		</main>
	);
};

export default Profile;
