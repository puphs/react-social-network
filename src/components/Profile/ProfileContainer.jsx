import React from 'react';
import { connect } from 'react-redux';
import { getProfile } from '../../redux/profileReducer';
import Profile from './Profile';
import { Redirect, withRouter } from 'react-router-dom';
import { withAuthRedirect } from '../hoc/withAuthRedirect';

class ProfileContainer extends React.Component {
	componentDidMount() {
		const userId = this.props.match.params.userId ?? 2;
		this.props.getProfile(userId);
	}

	render() {
		return <Profile {...this.props} />;
	}
}

const mapStateToProps = (state) => ({
	profile: state.profilePage.profile,
});

const ContainerWithUrlData = withRouter(ProfileContainer);

export default connect(mapStateToProps, { getProfile })(withAuthRedirect(ContainerWithUrlData));
// const mapStateToProps = (state) => ({
// 	id: state,
// });

// export default connect()(Profile);
