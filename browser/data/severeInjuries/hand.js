import {killSurvivor, addBleed} from './helpers';

const death = {
	top: '22.5%',
	left: '50%',
	bottom: '72%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(killSurvivor(target));
	}
};

const bleeding = {
	top: '29%',
	left: '50%',
	bottom: '68%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 2));
	}
};

const dismemberedArm = {
	top: '33%',
	left: '50%',
	bottom: '55.5%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const rupturedMuscle = {
	top: '45.5%',
	left: '50%',
	bottom: '45%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const contrature = {
	top: '56%',
	left: '50%',
	bottom: '35%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const brokenArm = {
	top: '66%',
	left: '50%',
	bottom: '24.5%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const spiralFracture = {
	top: '77%',
	left: '50%',
	bottom: '16.5%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const dislocatedShoulder = {
	top: '85%',
	left: '50%',
	bottom: '8%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const knockedDown = {
	top: '93.5%',
	left: '50%',
	bottom: '1%',
	right: '0%',
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
