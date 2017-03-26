import {killSurvivor, addBleed} from './helpers';

const death = {
	top: '22%',
	left: '50%',
	bottom: '71%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(killSurvivor(target));
	}
};

const bleeding = {
	top: '30.5%',
	left: '50%',
	bottom: '67%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 2));
	}
};

const internalProlapse = {
	top: '34.5%',
	left: '50%',
	bottom: '57%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const warpedPelvis = {
	top: '44.5%',
	left: '50%',
	bottom: '47%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const destroyedGenitals = {
	top: '54%',
	left: '50%',
	bottom: '32%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const brokenHip = {
	top: '68%',
	left: '50%',
	bottom: '22%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const slashedBack = {
	top: '79%',
	left: '50%',
	bottom: '14%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const bruisedTailBone = {
	top: '87%',
	left: '50%',
	bottom: '6%',
	right: '0%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 1));
	}
};

const knockedDown = {
	top: '95%',
	left: '50%',
	bottom: '0.5%',
	right: '0%',
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
