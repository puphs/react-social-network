import profileReducer, { actions, InitialStateType } from './profileReducer';

const state: InitialStateType = {
	posts: [{ id: 1, message: 'Hello, my friend', likesCount: 32 }],
	isFetching: false,
	profile: null,
	status: '',
};

it('length of posts should be incremented', () => {
	const newState = profileReducer(state, actions.addPost('asdf'));
	expect(newState.posts.length).toBe(2);
});

it('message of new post should be "test text"', () => {
	const newState = profileReducer(state, actions.addPost('test text'));

	// posts are added to the beginning of the posts array
	expect(newState.posts[0].message).toBe('test text');
});

it('after delete post length of posts should be decremented', () => {
	const newState = profileReducer(state, actions.deletePost(1));

	expect(newState.posts.length).toBe(0);
});

it('after delete post length of posts shouldn\'t be changed if id is incorrect"', () => {
	const newState = profileReducer(state, actions.deletePost(2));

	expect(newState.posts.length).toBe(1);
});
