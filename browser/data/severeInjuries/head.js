import { killSurvivor, addBleed } from './helpers';

const headExplosion = {
	top: '24%',
	left: '49%',
	bottom: '69%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
	thunk: (target) => (dispatch, getState) => {
		dispatch(killSurvivor(target));
		// TODO: Remove 1 survival from all survivors
	}
};

const decapitation = {
	top: '32.5%',
	left: '49%',
	bottom: '64.5%',
	right: '0%',
	thunk: (target) => (dispatch) => {
		dispatch(killSurvivor(target));
	}
};

const hemorrage = {
	top: '36.5%',
	left: '50%',
	bottom: '55%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
	thunk: (target) => (dispatch, getState) => {
		// TODO: Permant Can't use survival
		dispatch(addBleed(target, 1));
	}
};

const deaf = {
	top: '45.5%',
	left: '50%',
	bottom: '47%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
	thunk: (target) => (dispatch, getState) => {
		// TODO: IF not deaf
			// TODO: record deaf
			// TODO: Permant -1 evasion
		dispatch(addBleed(target, 1));
	}
};

const blind = {
	top: '54.5%',
	left: '50%',
	bottom: '32%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
	thunk: (target) => (dispatch, getState) => {
		// TODO: IF not blind
			// TODO: record blindx1
			// TODO: Permant -1 accuracy
		// TODO: If bindx1
			// TODO: record blindx2
			// TODO: Permant -4 accuracy
			// TODO: Retire at end
		dispatch(addBleed(target, 1));
	}
};

const concussion = {
	top: '69%',
	left: '50%',
	bottom: '25%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
	thunk: (target) => (dispatch, getState) => {
		// TODO: gain a random disorder
		dispatch(addBleed(target, 1));
	}
};

const shatteredJaw = {
	top: '76%',
	left: '50%',
	bottom: '12%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
	thunk: (target) => (dispatch, getState) => {
		// TODO: if do not have shattered jaw
			// TODO: record shattered jaw
			// TODO: Permant, can no longer consume
			// TODO: Permant, can no longer encorage
		dispatch(addBleed(target, 1));
	}
};

const destroyedTooth = {
	top: '89%',
	left: '49%',
	bottom: '1%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
	thunk: (target) => (dispatch, getState) => {
		// TODO: if 3+ courage
			// TODO: +2 insanity
		// TODO: else
		  // TODO: Knocked down
	}
};

export const head = {
	tableImg: '/static/severe-injuries/head.jpg',
	tableData: [
		headExplosion,
		headExplosion,
		decapitation,
		decapitation,
		hemorrage,
		deaf,
		blind,
		concussion,
		shatteredJaw,
		destroyedTooth
	]
};
