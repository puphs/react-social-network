import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
	return (
		<main className={s.profile}>
			<ProfileInfo profile={props.profile} />
			<MyPostsContainer profile={props.profile} />
		</main>
	);
};

export default Profile;
