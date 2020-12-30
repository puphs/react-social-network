export type UserType = {
	id: number;
	name: string;
	status: string;
	photos: PhotosType;
	followed: boolean;
};

export type PostType = {
	id: number;
	message: string;
	likesCount: number;
};

export type ProfileContactsType = {
	github: string;
	vk: string;
	facebook: string;
	instagram: string;
	twitter: string;
	website: string;
	youtube: string;
	mainLink: string;
};

export type PhotosType = {
	photos: Array<string>;
};

export type ProfileType = {
	userId: number;
	lookingForAJob: boolean;
	lookingForAJobDescription: string;
	fullName: string;
	contacts: ProfileContactsType;
	photos: PhotosType;
};

export type DialogType = {
	id: number;
	name: string;
};

export type MessageType = {
	id: number;
	message: string;
};
