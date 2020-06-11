import React, {Fragment} from 'react'
import RaceTrack from './RaceTrack'

function GameScreen({G, ctx, moves}) {

	return(
		<Fragment>
			<h1 onClick={moves.roll}>Camaew Up!</h1>
			<RaceTrack G={G} />
		</Fragment>
	);

}

export default GameScreen;