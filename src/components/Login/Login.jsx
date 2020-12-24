import { Field, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../FormControls/FormControls';
import s from './Login.module.css';

const LoginForm = (props) => {
	// console.log('renderForm :>> ');
	return (
		<div>
			<form className={s.form} onSubmit={props.handleSubmit}>
				<div className={s.formInput}>
					<Field
						className={s.login + ' ' + s.formInput + ' ' + 'inputBase'}
						placeholder={'Login'}
						name={'login'}
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

				<div>
					<button className={s.loginBtn + ' ' + 'btnBase'}>login</button>
				</div>
			</form>
		</div>
	);
};

const LoginReduxForm = reduxForm({ form: 'login' })(LoginForm);

const Login = (props) => {
	const onSubmit = (formData) => {
		console.log(formData);
	};
	return (
		<div className={s.container}>
			<h1 className={s.loginHeader}>Login</h1>
			<LoginReduxForm />
		</div>
	);
};

export default Login;
