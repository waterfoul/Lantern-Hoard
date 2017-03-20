import {changeBoardStatusAction} from '../../../common/gameState/board';

//thunks
export const changeBoardStatus = (status, data) => (
	(dispatch, getState) => {
		const {room} = getState();

		if (
			!room.gameState.board ||
			room.gameState.board.status !== status ||
			room.gameState.board.data !== data
		) {
			dispatch(changeBoardStatusAction(status, data));
		}
	}
);
