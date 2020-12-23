import { connect } from 'react-redux';
import React from 'react';
import { Redirect } from 'react-router-dom';

export const withAuthRedirect = (Component) => {
	class AuthRedirect extends React.Component {
		render() {
			if (!this.props.isAuth) return <Redirect to="/login" />;
			return <Component {...this.props} />;
		}
	}

	const mapStateToProps = (state) => ({
		isAuth: state.auth.isAuth,
	});
	return connect(mapStateToProps)(AuthRedirect);
};
