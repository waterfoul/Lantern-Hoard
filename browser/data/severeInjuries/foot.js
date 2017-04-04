import {killSurvivor, addBleed} from './helpers';

const death = {
	top: '22.5%',
	left: '50%',
	bottom: '72.5%',
	right: '0%',
	thunk: (target) => (dispatch) => {
		dispatch(killSurvivor(target));
	}
};

const bleeding = {
	top: '28.5%',
	left: '50%',
	bottom: '68.5%',
	right: '0%',
	thunk: (target) => (dispatch) => {
		dispatch(addBleed(target, 2));
	}
};

const dismemberedLeg = {
	top: '32.5%',
	left: '50%',
	bottom: '52%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
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
	top: '49.5%',
	left: '50%',
	bottom: '42%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
	thunk: (target) => (dispatch, getState) => {
		// TODO: If not hamstrung
			// TODO: record hanstrung
			// TODO: Permant, no longer use fighting arts or abilities
		dispatch(addBleed(target, 1));
	}
};

const tornAchilles = {
	top: '59.5%',
	left: '50%',
	bottom: '29.5%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
	thunk: (target) => (dispatch, getState) => {
		// TODO: until end of showdown, any light, heavy, or severe injury knocks you down
		// TODO: Skip next hunt
		dispatch(addBleed(target, 1));
	}
};

const tornMuscle = {
	top: '72%',
	left: '50%',
	bottom: '21.5%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
	thunk: (target) => (dispatch, getState) => {
		// TODO: Cannot dash till end of showdown
		// TODO: mark skip next hunt
		dispatch(addBleed(target, 1));
	}
};

const brokenLeg = {
	top: '80%',
	left: '50%',
	bottom: '11%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
	thunk: (target) => (dispatch, getState) => {
		// TODO: IF not brokenLegx2
			// TODO: record brokenLeg or brokenLegx2
			// TODO: adjacent survivors suffer 1 brain damage
			// TODO: Permant -1 movement
		dispatch(addBleed(target, 1));
	}
};

const bloodyThighs = {
	top: '90%',
	left: '50%',
	bottom: '6.5%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
	thunk: (target) => (dispatch, getState) => {
		dispatch(addBleed(target, 2));
	}
};

const knockedDown = {
	top: '94.5%',
	left: '50%',
	bottom: '0.5%',
	right: '0%',
	// TODO: Stub! Implement and remove BOTH of these comments
	// eslint-disable-next-line
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
