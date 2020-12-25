import s from './ProfileInfo.module.css';
import userPhoto from '../../../assets/images/user-photo.png';
import Preloader from '../../Preloader/Preloader';
import ProfileStatus from './ProfileStatus';
import ProfileStatusWithHooks from './ProfileStatusWithHooks';

const ProfileInfo = (props) => {
	const profile = props.profile;
	if (!profile) return <Preloader />;
	return (
		<div className={s.profileInfo}>
			<img className={s.avatar} src={profile?.photos?.large ?? userPhoto} />
			<div className={s.info}>
				<div className={s.name}>{profile?.fullName}</div>
				<ProfileStatusWithHooks status={props.status} updateStatus={props.updateStatus} />
			</div>
		</div>
	);
};

export default ProfileInfo;
