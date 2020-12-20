import User from './User';
import { connect } from 'react-redux';
import { toggleFollowUser } from '../../../redux/usersReducer';

const mapStateToProps = (state, props) => {
	return {
		user: props.user,
	};
};

const UserContainer = connect(mapStateToProps, { toggleFollowUser })(User);

export default UserContainer;
