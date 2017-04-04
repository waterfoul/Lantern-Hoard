//actions
const ARCHIVE_ITEM = 'ARCHIVE_ITEM';

//reducer
const initialState = [
	[
		['', '', ''],
		['', '', ''],
		['', '', '']
	],
	[
		['', '', ''],
		['', '', ''],
		['', '', '']
	],
	[
		['', '', ''],
		['', '', ''],
		['', '', '']
	],
	[
		['', '', ''],
		['', '', ''],
		['', '', '']
	]
];

const gear = (state = initialState, action) => {
	switch (action.type) {
		case ARCHIVE_ITEM: {
			const newState = [...state];
			newState[action.slot] = [...newState[action.slot]];
			newState[action.slot][action.row] = [...newState[action.slot][action.row]];
			newState[action.slot][action.row][action.column] = '';
			return newState;
		}
		default:
			return state;
	}
};

//action creators
const archiveItem = (slot, row, column) => ({
	type: ARCHIVE_ITEM,
	slot,
	row,
	column
});

module.exports = {
	gear,
	archiveItem
};
