import s from './ProfileJob.module.css';
import cn from 'classnames';

const ProfileJob = ({ profile, onEditBtnClick, isMyProfile }) => {
	return (
		<div className={s.job}>
			<div className={s.jobQuestions}>
				<div className={s.jobQuestionItem}>
					<span className={s.jobQuestion}>About me:</span>
					<span className={s.jobAnswer}>{profile.aboutMe || 'No about me'}</span>
				</div>
				<div className={s.jobQuestionItem}>
					<span className={s.jobQuestion}>Looking for a job:</span>
					<span className={s.jobAnswer}>{profile.lookingForAJob ? 'Yes' : 'No'}</span>
				</div>
				{profile.lookingForAJob && (
					<div className={s.jobQuestionItem}>
						<span className={s.jobQuestion}>Job description:</span>
						<span className={s.jobAnswer}>
							{profile.lookingForAJobDescription || 'No description'}
						</span>
					</div>
				)}
			</div>
			{isMyProfile && (
				<button className={cn(s.editBtn, 'btnBase')} onClick={onEditBtnClick}>
					Edit
				</button>
			)}
		</div>
	);
};

export default ProfileJob;
