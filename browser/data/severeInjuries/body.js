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

const wound = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: Permant -1 strength
		dispatch(addBleed(target, 1));
	}
};

const destroyedBack = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: IF not destroyed back
		// TODO: record destroyed back
			// TODO: Permant -2 movement
			// TODO: No longer use +2 strength equip
		dispatch(addBleed(target, 1));
	}
};

const disemboweled = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: add - movement tokens till movement is 1
		// TODO: mark dead if all other survivors die
		// TODO: mark skip next hunt
		dispatch(addBleed(target, 1));
	}
};

const spleen = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: mark skip next hunt
		dispatch(addBleed(target, 2));
	}
};

const rib = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: permant -1 speed
		dispatch(addBleed(target, 1));
	}
};

const lung = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: -1 movment token
		dispatch(addBleed(target, 1));
	}
};

const bowled = {
	top: '50%',
	left: '50%',
	bottom: '51%',
	right: '52%',
	thunk: (target) => (dispatch, getState) => {
		// TODO: Knocked down
	}
};

export const body = {
	tableImg: '/static/severe-injuries/body.jpg',
	tableData: [
		death,
		death,
		bleeding,
		wound,
		destroyedBack,
		disemboweled,
		spleen,
		rib,
		lung,
		bowled
	]
};
