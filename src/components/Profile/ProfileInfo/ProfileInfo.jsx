import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user-photo.png';
import Preloader from '../../Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';
import ProfileJob from './ProfileJob';
import { useState } from 'react';
import ProfileJobForm from './ProfileJobForm';

const ProfileInfo = ({
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

	const onProfileJobFormSubmit = (formData) => {
		setEditMode(false);
		updateProfile({
			...profile,
			...formData,
			lookingForAJob: formData.lookingForAJob ?? false,
		});
	};

	const onAvatarUpload = (e) => {
		if (e.target.files.length) {
			updateAvatar(e.target.files[0]);
		}
	};

	return (
		<div className={s.profileInfo}>
			<div className={s.avatarAndMainInfo}>
				<div className={s.avatarContainer}>
					<img className={s.avatar} src={profile?.photos?.large ?? userPhoto} />
					{isMyProfile && (
						<div className={s.avatarUpload}>
							<input className={s.avatarUploadInput} type="file" onChange={onAvatarUpload} />
						</div>
					)}
				</div>
				<div className={s.mainInfo}>
					<div className={s.name}>{profile?.fullName}</div>
					<ProfileStatusWithHooks
						status={status}
						updateStatus={updateStatus}
						updateAvatar={updateAvatar}
						isMyProfile={isMyProfile}
					/>
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
