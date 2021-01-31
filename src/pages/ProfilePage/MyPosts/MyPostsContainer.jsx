import React from 'react';
import { actions } from '../../../redux/profileReducer';
import MyPosts from './MyPosts';
import { connect } from 'react-redux';
import { compose } from 'redux';

const MyPostsContainer = (props) => {
	return <MyPosts {...props} />;
};

const mapStateToProps = (state) => {
	return {
		posts: state.profilePage.posts,
		profile: state.profilePage.profile,
	};
};

export default compose(
	connect(mapStateToProps, {
		addPost: actions.addPost,
	}),
	React.memo
)(MyPostsContainer);
