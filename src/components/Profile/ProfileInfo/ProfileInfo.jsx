import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user-photo.png';
import Preloader from '../../Preloader/Preloader';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = ({ profile, status, updateStatus }) => {
	if (!profile) return <Preloader />;
	return (
		<div className={s.profileInfo}>
			<img className={s.avatar} src={profile?.photos?.large ?? userPhoto} />
			<div className={s.info}>
				<div className={s.name}>{profile?.fullName}</div>
				<ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
			</div>
		</div>
	);
};

export default ProfileInfo;
