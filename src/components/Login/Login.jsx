import { Field, reduxForm } from 'redux-form';
import s from './Login.module.css';

const LoginForm = (props) => {
	// console.log('renderForm :>> ');
	return (
		<div>
			<form onSubmit={props.handleSubmit}>
				<div>
					<Field placeholder={'login'} name={'login'} component={'input'} />
				</div>
				<div>
					<Field placeholder={'password'} name={'password'} component={'input'} />
				</div>
				<div>
					<Field
						placeholder={'password'}
						name={'rememberMe'}
						type={'checkbox'}
						component={'input'}
					/>
					remember me
				</div>
				<div>
					<button>login</button>
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
		<>
			<h1>login</h1>
			<LoginReduxForm />
		</>
	);
};

export default Login;
