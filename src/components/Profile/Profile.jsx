import s from './Profile.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';

const Profile = (props) => {
	return (
		<main className={s.profile}>
			<ProfileInfo
				profile={props.profile}
				status={props.status}
				updateStatus={props.updateStatus}
				updateAvatar={props.updateAvatar}
				updateProfile={props.updateProfile}
				isMyProfile={props.isMyProfile}
			/>
			{props.isMyProfile && <MyPostsContainer />}
		</main>
	);
};

export default Profile;
