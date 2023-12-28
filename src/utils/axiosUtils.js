import axios from 'axios';

const client = axios.create({ baseURL: 'http://localhost:4000' });

export const request = ({ url, method, data, params }) => {
	client.defaults.headers.common.Authorization =
		'Bearer ' + localStorage.getItem('token');
	const onSuccess = (response) => {
		return response;
	};

	const onError = (error) => {
		console.log(error);
		return error;
	};

	return client({
		url,
		method,
		data,
		params,
	})
		.then(onSuccess)
		.catch(onError);
};
