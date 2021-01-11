import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../../redux/authReducer';
import { AppStateType } from '../../../redux/reduxStore';
import LoginInfo from './LoginInfo';

type MapStateProps = ReturnType<typeof mapStateToProps>;
type MapDispatchProps = {
	logout: () => void;
};

const LoginInfoContainer: React.FC<MapStateProps & MapDispatchProps> = (props) => {
	return <LoginInfo {...props} />;
};

const mapStateToProps = (state: AppStateType) => ({
	login: state.auth.login,
	authProfile: state.auth.authProfile,
	isAuth: state.auth.isAuth,
});

export default connect(mapStateToProps, { logout })(LoginInfoContainer);
