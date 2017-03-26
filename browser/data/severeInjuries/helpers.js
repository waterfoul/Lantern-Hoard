export const killSurvivor = (target) => (dispatch, getState) => {
	console.log('Survivor', target, 'is dead');
	// TODO: Kill survivor
};

export const addBleed = (target, count) => (dispatch, getState) => {
	console.log('Adding', count, 'bleed tokens to', target);
	// TODO: Add bleed token
	// TODO: If 5 bleed tokens
		// TODO: killSurvivor
};
