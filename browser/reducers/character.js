import axios from 'axios';

//thunks
export const killCharacter = (id) => (
	() =>
		axios.put(`/api/character/${id}`, {
			dead: true
		})
			.catch((e) => {
				// TODO: Display an error on the UI
				// eslint-disable-next-line no-console
				console.error('Error while killing character', e);
			})
);
