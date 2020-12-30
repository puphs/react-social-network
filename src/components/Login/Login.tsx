import { Redirect } from 'react-router-dom';
import { Field, InjectedFormProps, reduxForm } from 'redux-form';
import { required } from '../../utils/validators/validators';
import { Input } from '../FormControls/FormControls';
import s from './Login.module.css';
import cn from 'classnames';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/reduxStore';
import { login } from '../../redux/authReducer';

type LoginFormValuesType = {
	email: string;
	password: string;
	rememberMe: boolean;
	captcha: string | null;
};

type LoginFormOwnProps = {
	captchaUrl: string | null;
};

const LoginForm: React.FC<
	InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps
> = ({ handleSubmit, error, captchaUrl }) => {
	return (
		<div>
			{error && <div className={s.errorText}>{error}</div>}
			<form className={s.form} onSubmit={handleSubmit}>
				<div className={s.formInput}>
					<Field
						className={cn(s.login, s.formInput, 'inputBase')}
						placeholder={'Email'}
						name={'email'}
						component={Input}
						validate={[required]}
					/>
				</div>
				<div className={s.formInput}>
					<Field
						className={(s.password, 'inputBase')}
						placeholder={'Password'}
						name={'password'}
						type={'password'}
						component={Input}
						validate={[required]}
					/>
				</div>
				<div className={cn(s.formInput, s.rememberMeContainer)}>
					<Field
						className={s.rememberMe}
						id={'rememberMe'}
						name={'rememberMe'}
						component={'input'}
						type={'checkbox'}
					/>
					<label className={s.remembeMeLabel} htmlFor={'rememberMe'}>
						Remember me
					</label>
				</div>
				{captchaUrl && (
					<div className={s.formInput}>
						<img src={captchaUrl} alt="captcha" />
						<div>
							<Field
								className={(s.captcha, 'inputBase')}
								placeholder={'Please enter captcha'}
								name={'captcha'}
								component={Input}
								validate={required}
							/>
						</div>
					</div>
				)}

				<button className={cn(s.loginBtn, 'btnBase')}>login</button>
			</form>
		</div>
	);
};

const LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({ form: 'login' })(
	LoginForm
);

type MapStatePropsType = {
	isAuth: boolean;
	captchaUrl: string | null;
};

type MapDispatchPropsType = {
	login: (email: string, password: string, rememberMe: boolean, captcha: string | null) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Login: React.FC<PropsType> = ({ login, isAuth, captchaUrl }) => {
	const onSubmit = (formData: LoginFormValuesType) => {
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

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
	isAuth: state.auth.isAuth,
	captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(Login);
