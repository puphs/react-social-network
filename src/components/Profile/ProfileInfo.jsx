import s from './ProfileInfo.module.css';
import userPhoto from '../../assets/images/user-photo.png';
import Preloader from '../Preloader/Preloader';

const ProfileInfo = (props) => {
	const profile = props.profile;
	if (!profile) return <Preloader />;
	return (
		<div className={s.profileInfo}>
			<img className={s.avatar} src={profile?.photos?.large ?? userPhoto} />
			<div className={s.info}>
				<div className={s.name}>{profile?.fullName}</div>
				<div className={s.about}>{profile?.aboutMe}</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
