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

const dismemberedLeg = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: IF not dismemberedLegx2
			// TODO: record dismemberedLeg or dismemberedLegx2
			// TODO: Permant -2 movement
			// TODO: Permant no more dash
			// TODO: IF dismemberedLeg
				// TODO: Retire at end
		dispatch(addBleed(target, 1));
	}
};

const hamstrung = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: If not hamstrung
			// TODO: record hanstrung
			// TODO: Permant, no longer use fighting arts or abilities
		dispatch(addBleed(target, 1));
	}
};

const tornAchilles = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: until end of showdown, any light, heavy, or severe injury knocks you down
		// TODO: Skip next hunt
		dispatch(addBleed(target, 1));
	}
};

const tornMuscle = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: Cannot dash till end of showdown
		// TODO: mark skip next hunt
		dispatch(addBleed(target, 1));
	}
};

const brokenLeg = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: IF not brokenLegx2
			// TODO: record brokenLeg or brokenLegx2
			// TODO: adjacent survivors suffer 1 brain damage
			// TODO: Permant -1 movement
		dispatch(addBleed(target, 1));
	}
};

const bloodyThighs = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 2));
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

export const foot = {
	tableImg: '/static/severe-injuries/legs.jpg',
	tableData: [
		death,
		bleeding,
		bleeding,
		dismemberedLeg,
		hamstrung,
		tornAchilles,
		tornMuscle,
		brokenLeg,
		bloodyThighs,
		knockedDown
	]
};
