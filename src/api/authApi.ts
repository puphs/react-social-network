import { axiosInstance, getData, ResponseType, ResultCode, ResultCodeCaptcha } from './api';

type AuthResponseType = ResponseType<
	{
		id: number;
		login: string;
		email: string;
	},
	ResultCode
>;
type LoginResponseType = ResponseType<
	{
		userId: number;
	},
	ResultCode | ResultCodeCaptcha
>;
type LogoutResponseType = ResponseType;

const authApi = {
	auth() {
		return getData<AuthResponseType>(axiosInstance.get('auth/me'));
	},
	login(email: string, password: string, rememberMe: boolean, captcha: string | null) {
		return getData<LoginResponseType>(
			axiosInstance.post('auth/login', {
				email,
				password,
				rememberMe,
				captcha,
			})
		);
	},
	logout() {
		return getData<LogoutResponseType>(axiosInstance.delete('auth/login'));
	},
};

export default authApi;
