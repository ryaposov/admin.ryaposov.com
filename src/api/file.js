import api from './index';

export const getAll = async (id) => {
	try {
		const data = await api(`/files/${id}/`, { method: 'GET' });
		return Promise.resolve(data);
	} catch (error) {
		return Promise.resolve(error);
	}
};

export const deleteOne = async (id, name) => {
	try {
		const data = await api(`/files/${id}/?name=${name}`, { method: 'DELETE' });
		return Promise.resolve(data);
	} catch (error) {
		return Promise.resolve(error);
	}
};
