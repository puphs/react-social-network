import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user-photo.png';
import Preloader from '../../Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({ profile, status, updateStatus, updateAvatar, isMyProfile }) => {
	if (!profile) return <Preloader />;

	const onAvatarUpload = (e) => {
		if (e.target.files.length) {
			updateAvatar(e.target.files[0]);
		}
	};

	return (
		<div className={s.profileInfo}>
			<div className={s.avatarContainer}>
				<img className={s.avatar} src={profile?.photos?.large ?? userPhoto} />
				{isMyProfile && (
					<div className={s.avatarUpload}>
						<input className={s.avatarUploadInput} type="file" onChange={onAvatarUpload} />
					</div>
				)}
			</div>
			<div className={s.info}>
				<div className={s.name}>{profile?.fullName}</div>
				<ProfileStatusWithHooks
					status={status}
					updateStatus={updateStatus}
					updateAvatar={updateAvatar}
					isMyProfile={isMyProfile}
				/>
			</div>
		</div>
	);
};

export default ProfileInfo;
