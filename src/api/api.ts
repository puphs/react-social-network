import axios, { AxiosResponse } from 'axios';

export enum ResultCode {
	Success = 0,
	Error = 1,
}
export enum ResultCodeCaptcha {
	CaptchaIsRequired = 10,
}

export type ResponseType<D = {}, RC = ResultCode> = {
	data: D;
	resultCode: RC;
	messages: Array<string>;
};

export const axiosInstance = axios.create({
	baseURL: 'https://social-network.samuraijs.com/api/1.0/',
	withCredentials: true,
	headers: { 'API-KEY': 'c350fdef-8fe3-4213-b69a-ff3048964702' },
});

export const getData = <T>(promise: Promise<AxiosResponse<T>>) =>
	promise.then((response) => response.data);
