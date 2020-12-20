import User from './User';
import { connect } from 'react-redux';
import { followUserToggleCreator } from '../../../redux/usersReducer';

const mapStateToProps = (state, props) => {
	return {
		user: props.user,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		toggleFollowUser: (userId) => {
			dispatch(followUserToggleCreator(userId));
		},
	};
};

const UserContainer = connect(mapStateToProps, mapDispatchToProps)(User);

export default UserContainer;
