function shuffle (cards) {
	let shuffledCards = [...cards];
	let i = 0
		, j = 0
		, temp = null;

	for (i = shuffledCards.length - 1; i > 0; i -= 1) {
		j = Math.floor(Math.random() * (i + 1));
		temp = shuffledCards[i];
		shuffledCards[i] = shuffledCards[j];
		shuffledCards[j] = temp;
	}
	return shuffledCards;
}