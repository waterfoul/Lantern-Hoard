import {monsters} from '../../data/monsters';


//thunks
// const monsterCardState = {
// 	discarded: []
// };

export const startMonsterTurn = () => (
	(dispatch, getState) => {
		const { room, auth: user } = getState();
		const { gameState } = room;

		if (gameState.monsterController === user.id) {
			let nextCard = gameState.ai.deck.shift();

			gameState.ai.discard.unshift(nextCard);

			const card = monsters[gameState.monsterName].ai.cards[nextCard];
			console.log(card);
		}

		console.log('Begin Player turn');
	}
);
