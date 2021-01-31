import s from './ProfilePage.module.css';
import ProfileInfo from './ProfileInfo/ProfileInfo';
import MyPostsContainer from './MyPosts/MyPostsContainer';
import { ProfileType } from '../../types/types';

type PropsTypes = {
	profile: ProfileType | null;
	status: string;
	updateStatus: (status: string) => void;
	updateAvatar: (avatar: File) => void;
	updateProfile: (profile: ProfileType) => void;
	isMyProfile: boolean;
};

const ProfilePage: React.FC<PropsTypes> = (props) => {
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

export default ProfilePage;
