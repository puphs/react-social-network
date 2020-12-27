import { Redirect } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../FormControls/FormControls';
import s from './Login.module.css';

const LoginForm = ({ handleSubmit, error, captchaUrl }) => {
	return (
		<div>
			{error && <div className={s.errorText}>{error}</div>}
			<form className={s.form} onSubmit={handleSubmit}>
				<div className={s.formInput}>
					<Field
						className={s.login + ' ' + s.formInput + ' ' + 'inputBase'}
						placeholder={'Email'}
						name={'email'}
						component={Input}
						validate={[required]}
					/>
				</div>
				<div className={s.formInput}>
					<Field
						className={s.password + ' ' + 'inputBase'}
						placeholder={'Password'}
						name={'password'}
						type={'password'}
						component={Input}
						validate={[required]}
					/>
				</div>

				<div className={s.formInput + ' ' + s.rememberMeContainer}>
					<Field
						className={s.rememberMe}
						id={'rememberMe'}
						name={'rememberMe'}
						component={'input'}
						type={'checkbox'}
					/>
					<label className={s.remembeMeLabel} for={'rememberMe'}>
						Remember me
					</label>
				</div>

				{captchaUrl && (
					<div className={s.formInput}>
						<img src={captchaUrl} />
						<div>
							<Field
								className={s.captcha + ' ' + 'inputBase'}
								placeholder={'Please enter captcha'}
								name={'captcha'}
								component={Input}
								validate={required}
							/>
						</div>
					</div>
				)}

				<div>
					<button className={s.loginBtn + ' ' + 'btnBase'}>login</button>
				</div>
			</form>
		</div>
	);
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = ({ login, isAuth, captchaUrl }) => {
	const onSubmit = (formData) => {
		const { email, password, rememberMe, captcha } = formData;
		login(email, password, rememberMe, captcha);
	};

	if (isAuth) return <Redirect to="/profile" />;

	return (
		<div className={s.container}>
			<h1 className={s.loginHeader}>Login</h1>
			<LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl} />
		</div>
	);
};

export default Login;
