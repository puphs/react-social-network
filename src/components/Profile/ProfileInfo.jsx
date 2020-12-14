import s from './ProfileInfo.module.css';

const ProfileInfo = (props) => {
	return (
		<div className={s.profileInfo}>
			<img
				className={s.avatar}
				src="https://img2.freepng.ru/20180319/pde/kisspng-computer-icons-icon-design-avatar-flat-face-icon-5ab06e33bee962.122118601521511987782.jpg"
			/>
			<div className={s.info}>
				<div className={s.name}>Kevin</div>
				<div className={s.about}>I like to play computer games</div>
			</div>
		</div>
	);
};

export default ProfileInfo;
