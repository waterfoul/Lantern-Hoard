import { firstStory } from '../../scenarios/firstStory';


//thunks
// const monsterCardState = {
// 	discarded: []
// };

export const startMonsterTurn = () => (
	(dispatch, getState) => {
		const { room, auth: user } = getState();
		if (room.gameState.monsterController === user.id) {
			let nextCard = firstStory.ai.deck.shift();

			firstStory.ai.discard.unshift(nextCard);

			console.log(firstStory.ai.discard[0]);
		}
	}
);
