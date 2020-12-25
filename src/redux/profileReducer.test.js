import profileReducer, { addPost, deletePost } from './profileReducer';

const state = {
	posts: [{ id: 1, message: 'Hello, my friend', likesCount: 32 }],
};

it('length of posts should be incremented', () => {
	const newState = profileReducer(state, addPost('test text'));

	expect(newState.posts.length).toBe(2);
});

it('message of new post should be "test text"', () => {
	const newState = profileReducer(state, addPost('test text'));

	expect(newState.posts[1].message).toBe('test text');
});

it('after delete post length of posts should be decremented', () => {
	const newState = profileReducer(state, deletePost(1));

	expect(newState.posts.length).toBe(0);
});

it('after delete post length of posts shouldn\'t be changed if id is incorrect"', () => {
	const newState = profileReducer(state, deletePost(2));

	expect(newState.posts.length).toBe(1);
});
