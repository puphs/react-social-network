import { PhotosType, ProfileType } from '../types/types';
import { ResponseType, axiosInstance, getData } from './api';

type LoadProfileResponseType = ProfileType;
type StatusResponseType = ResponseType;
type AvatarResponseType = ResponseType<{ photos: PhotosType }>;
type UpdateProfileResponseType = ResponseType;

const profileApi = {
	loadProfile(userId: number) {
		return getData<LoadProfileResponseType>(axiosInstance.get(`profile/${userId}`));
	},
	getStatus(userId: number) {
		return getData<string>(axiosInstance.get(`profile/status/${userId}`));
	},
	updateStatus(status: string) {
		return getData<StatusResponseType>(
			axiosInstance.put(`profile/status`, { status: status || '' })
		);
	},
	updateAvatar(avatarFile: string) {
		const formData = new FormData();
		formData.append('image', avatarFile);
		return getData<AvatarResponseType>(
			axiosInstance.put('/profile/photo', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})
		);
	},
	updateProfile(profile: ProfileType) {
		return getData<UpdateProfileResponseType>(axiosInstance.put('/profile', profile));
	},
};

export default profileApi;
