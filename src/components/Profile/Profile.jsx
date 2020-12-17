import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
	return (
		<main className={s.profile}>
			<ProfileInfo />
			<MyPostsContainer />
		</main>
	);
};

export default Profile;
