import { Field, reduxForm } from 'redux-form';
import { required } from '../../../utils/validators/validators';
import { Input, TextArea } from '../../FormControls/FormControls';
import s from './ProfileJob.module.css';

const ProfileJobForm = ({ handleSubmit }) => {
	return (
		<form className={s.job} onSubmit={handleSubmit}>
			<div className={s.jobQuestions}>
				<div className={s.jobQuestionItem}>
					<span className={s.jobQuestion}>About me:</span>
					<div className={s.jobAnswerInputContainer}>
						<Field
							className={s.jobAnswerInput}
							name={'aboutMe'}
							component={TextArea}
							validate={[required]}
						/>
					</div>
				</div>
				<div className={s.jobQuestionItem}>
					<span className={s.jobQuestion}>Looking for a job:</span>
					<Field
						className={s.jobAnswerInput + ' ' + s.jobAnswerCheckbox}
						name={'lookingForAJob'}
						component={'input'}
						type={'checkbox'}
					/>
				</div>
				<div className={s.jobQuestionItem}>
					<span className={s.jobQuestion}>Job description:</span>
					<div className={s.jobAnswerInputContainer}>
						<Field
							className={s.jobAnswerInput}
							name={'lookingForAJobDescription'}
							component={TextArea}
							validate={[required]}
						/>
					</div>
				</div>
			</div>
			<button className={s.saveBtn + ' ' + 'btnBase'}>Save</button>
		</form>
	);
};

export default reduxForm({ form: 'profileJob' })(ProfileJobForm);
