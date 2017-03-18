import React from 'react';
import {connect} from 'react-redux';

export const Character = connect(
	({ room }) => ({
		armor: room.gameState.armor
	})
) (({ armor, slot }) => (
	<div>
		<div className="game-character-collapsed container-fluid">
			<div className="col-md-5">
				<div>Character Name</div>
				<div>
					<i className="glyphicon glyphicon-screenshot" />&nbsp;
					<span>
						{0}
						&nbsp;/&nbsp;
						{0}
						&nbsp;/&nbsp;
						{0}
						&nbsp;/&nbsp;
						{0}
						&nbsp;/&nbsp;
						{0}
						&nbsp;/&nbsp;
						{0}
					</span>
				</div>
				<div>
					<i className="glyphicon glyphicon-heart" />&nbsp;
					<span>
						{armor[slot].head}
						&nbsp;/&nbsp;
						{armor[slot].body}
						&nbsp;/&nbsp;
						{armor[slot].waist}
						&nbsp;/&nbsp;
						{armor[slot].hand}
						&nbsp;/&nbsp;
						{armor[slot].foot}
					</span>
				</div>
			</div>
			<div className="col-md-7">
				<button className="btn btn-primary">Fist & Tooth</button>
				<button className="btn btn-primary">Founding Stone</button>
			</div>
		</div>
	</div>
));
