import React from 'react';
import { connect } from 'react-redux';
import { getUserData } from '../../../redux/authReducer';
import LoginInfo from './LoginInfo';

class LoginInfoContainer extends React.Component {
	componentDidMount() {
		this.props.getUserData();
	}

	auth() {}

	render() {
		return <LoginInfo {...this.props} />;
	}
}

const mapStateToProps = (state) => ({
	login: state.auth.login,
	isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { getUserData })(LoginInfoContainer);
