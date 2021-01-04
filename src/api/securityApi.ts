import { axiosInstance, getData } from './api';

type CaptchaResponseType = {
	url: string;
};

const securityApi = {
	getCaptchaUrl() {
		return getData<CaptchaResponseType>(axiosInstance.get('security/get-captcha-url'));
	},
};

export default securityApi;
