export function getXYDistance(size, monster, player) {
	let X = monster[0] - player[0];
	let Y = monster[1] - player[1];
	if (X < 0) {
		X += (size - 1);
	}
	if (Y > 0) {
		Y -= (size - 1);
	}
	return {X, Y};
}

export function getDistance(size, monster, player) {
	const {X, Y} = getXYDistance(size, monster, player);
	return Math.abs(X) + Math.abs(Y);
}
