import React from 'react';
import { connect } from 'react-redux';
import { getAuthUserData, logout } from '../../../redux/authReducer';
import LoginInfo from './LoginInfo';

class LoginInfoContainer extends React.Component {
	componentDidMount() {
		this.props.getAuthUserData();
	}

	render() {
		return <LoginInfo {...this.props} />;
	}
}

const mapStateToProps = (state) => ({
	login: state.auth.login,
	isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { getAuthUserData, logout })(LoginInfoContainer);
