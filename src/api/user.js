import api from './index';

export const signIn = async (body) => {
	try {
		const data = await api(`/user/sign-in`, {
			method: 'POST',
			body: JSON.stringify(body)
		});
		return Promise.resolve(data);
	} catch (error) {
		return Promise.resolve(error);
	}
};
