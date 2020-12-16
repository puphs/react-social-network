import MyPosts from './MyPosts/MyPosts';
import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo';

const Profile = (props) => {
	return (
		<main className={s.profile}>
			<ProfileInfo />
			<MyPosts
				newPostText={props.profilePage.newPostText}
				posts={props.profilePage.posts}
				dispatch={props.dispatch}
			/>
		</main>
	);
};

export default Profile;
