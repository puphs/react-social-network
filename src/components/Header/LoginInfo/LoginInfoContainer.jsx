import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../redux/authReducer';
import LoginInfo from './LoginInfo';

class LoginInfoContainer extends React.Component {
	render() {
		return <LoginInfo {...this.props} />;
	}
}

const mapStateToProps = (state) => ({
	login: state.auth.login,
	authProfile: state.auth.authProfile,
	isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { logout })(LoginInfoContainer);
