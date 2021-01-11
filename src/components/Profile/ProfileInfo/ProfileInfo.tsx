import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user-photo.png';
import Preloader from '../../Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import ProfileJob from './ProfileJob';
import { ChangeEvent, useState } from 'react';
import ProfileJobForm from './ProfileJobForm';
import { ProfileType } from '../../../types/types';
import { ProfileJobFormValuesType } from './ProfileJobForm';

type PropsTypes = {
	profile: ProfileType | null;
	status: string;
	updateStatus: (status: string) => void;
	updateAvatar: (avatar: File) => void;
	updateProfile: (profile: ProfileType) => void;
	isMyProfile: boolean;
};

const ProfileInfo: React.FC<PropsTypes> = ({
	profile,
	status,
	updateStatus,
	updateAvatar,
	updateProfile,
	isMyProfile,
}) => {
	const [editMode, setEditMode] = useState(false);

	if (!profile) return <Preloader />;

	const onEditBtnClick = () => {
		setEditMode(true);
	};

	const onProfileJobFormSubmit = (formData: ProfileJobFormValuesType) => {
		setEditMode(false);
		const { aboutMe, lookingForAJob, lookingForAJobDescription } = { ...formData };
		updateProfile({
			...profile,
			aboutMe,
			lookingForAJob,
			lookingForAJobDescription,
		});
	};

	const onAvatarUpload = (e: ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.length) {
			updateAvatar(e.target.files[0]);
		}
	};

	return (
		<div className={s.profileInfo}>
			<div className={s.avatarAndMainInfo}>
				<div className={s.avatarContainer}>
					<img className={s.avatar} src={profile?.photos?.large ?? userPhoto} alt={'avatar'} />
					{isMyProfile && (
						<div className={s.avatarUpload}>
							<input className={s.avatarUploadInput} type="file" onChange={onAvatarUpload} />
						</div>
					)}
				</div>
				<div className={s.mainInfo}>
					<div className={s.name}>{profile?.fullName}</div>
					<ProfileStatus status={status} updateStatus={updateStatus} isMyProfile={isMyProfile} />
				</div>
			</div>
			<div className={s.job}>
				{editMode ? (
					<ProfileJobForm initialValues={{ ...profile }} onSubmit={onProfileJobFormSubmit} />
				) : (
					<ProfileJob profile={profile} isMyProfile={isMyProfile} onEditBtnClick={onEditBtnClick} />
				)}
			</div>
		</div>
	);
};

export default ProfileInfo;
