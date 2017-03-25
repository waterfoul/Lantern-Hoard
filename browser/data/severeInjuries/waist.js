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

const internalProlapse = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const warpedPelvis = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const destroyedGenitals = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const brokenHip = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const slashedBack = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const bruisedTailBone = {
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

export const waist = {
	tableImg: '/static/severe-injuries/waist.jpg',
	tableData: [
		death,
		death,
		bleeding,
		internalProlapse,
		warpedPelvis,
		destroyedGenitals,
		brokenHip,
		slashedBack,
		bruisedTailBone,
		knockedDown
	]
};
