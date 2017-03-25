import {killSurvivor, addBleed} from './helpers';

const headExplosion = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(killSurvivor(target));
		// TODO: Remove 1 survival from all survivors
	}
};

const decapitation = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(killSurvivor(target));
	}
};

const hemorrage = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: Permant Can't use survival
		dispatch(addBleed(target, 1));
	}
};

const deaf = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: IF not deaf
			// TODO: record deaf
			// TODO: Permant -1 evasion
		dispatch(addBleed(target, 1));
	}
};

const blind = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
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
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: gain a random disorder
		dispatch(addBleed(target, 1));
	}
};

const shatteredJaw = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: if do not have shattered jaw
			// TODO: record shattered jaw
			// TODO: Permant, can no longer consume
			// TODO: Permant, can no longer encorage
		dispatch(addBleed(target, 1));
	}
};

const destroyedTooth = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
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
