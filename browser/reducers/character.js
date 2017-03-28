import axios from 'axios';

//thunks
export const killCharacter = (id) => (
	() =>
		axios.put(`/api/character/${id}`, {
			dead: true
		})
			.catch((e) => {
				console.error('Error while killing character', e);
			})
);
