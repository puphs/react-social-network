import { connect } from 'react-redux';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { AppStateType } from '../../redux/reduxStore';

export const withAuthRedirect = <P extends {}>(Component: React.ComponentType<P>) => {
	type MapStatePropsType = ReturnType<typeof mapStateToProps>;

	const AuthRedirect: React.FC<MapStatePropsType> = (props) => {
		const { isAuth, ...restProps } = props;

		if (!isAuth) return <Redirect to="/login" />;

		return <Component {...(restProps as P)} />;
	};

	const mapStateToProps = (state: AppStateType) => ({
		isAuth: state.auth.isAuth,
	});
	return connect(mapStateToProps)(AuthRedirect);
};
