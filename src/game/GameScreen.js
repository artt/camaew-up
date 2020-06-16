import React, {Fragment} from 'react'
import RaceTrack from './RaceTrack'
import {Button} from 'react-bootstrap'

function GameScreen({G, ctx, moves}) {

	function roll() {
		moves.roll()
	}

	return(
		<Fragment>
			<h1>Camaew Up!</h1>
			<div>
				<Button variant="primary" onClick={roll}>Roll</Button>
			</div>
			<RaceTrack G={G} />
		</Fragment>
	);

}

export default GameScreen;