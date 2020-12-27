import { connect } from 'react-redux';
import { login } from '../../redux/authReducer';
import Login from './Login';

const LoginContainer = (props) => {
	return <Login {...props} />;
};

const mapStateToProps = (state) => ({
	isAuth: state.auth.isAuth,
	captchaUrl: state.auth.captchaUrl,
});

export default connect(mapStateToProps, { login })(LoginContainer);
