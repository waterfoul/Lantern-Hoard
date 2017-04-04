let oldBoard = {};
const statusListeners = {};

// This allows things to listen for certain board statuses to happen
export const listenForBoardStatus = (status, thunk) => {
	statusListeners[status] = statusListeners[status] || [];
	statusListeners[status].push(thunk);
};

export const init = (store) => {
	store.subscribe(() => {
		const { room } = store.getState();
		const newBoard = room && room.gameState && room.gameState.board || {};
		if (oldBoard.status !== newBoard.status || oldBoard.data !== newBoard.data) {
			oldBoard = newBoard;
			if (statusListeners[newBoard.status]) {
				statusListeners[newBoard.status].forEach((thunk) => store.dispatch(thunk(newBoard)));
			}
		}
	});
};
