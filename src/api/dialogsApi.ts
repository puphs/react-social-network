import { axiosInstance, getData } from './api';

const dialogsApi = {
	loadDialogs() {
		return getData<any>(axiosInstance.get('/dialogs'));
	},

	startChatting(userId: number) {
		return getData<any>(axiosInstance.put(`/dialogs/${userId}`));
	},
};

export default dialogsApi;
