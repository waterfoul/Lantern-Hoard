import {killSurvivor, addBleed} from './helpers';

const death = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(killSurvivor(target));
	}
};

const bleeding = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 2));
	}
};

const dismemberedArm = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const rupturedMuscle = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const contrature = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const brokenArm = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const spiralFracture = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const dislocatedShoulder = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const knockedDown = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: Knocked down
	}
};

export const hand = {
	tableImg: '/static/severe-injuries/arms.jpg',
	tableData: [
		death,
		death,
		bleeding,
		dismemberedArm,
		rupturedMuscle,
		contrature,
		brokenArm,
		spiralFracture,
		dislocatedShoulder,
		knockedDown
	]
};
