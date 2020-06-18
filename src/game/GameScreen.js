import React, {Fragment} from 'react'
import RaceTrack from './RaceTrack'
import Players from './Players'
import RolledDice from './RolledDice'
import SmallStack from './SmallStack'
import {Button} from 'react-bootstrap'

function GameScreen({G, ctx, moves, playerID, gameMetadata}) {

	function roll() {
		moves.roll()
	}

	function makeSmallBet(bet) {
		moves.makeSmallBet(playerID, bet)
	}

	// console.log(gameMetadata)

	return(
		<Fragment>
			<div>Camaew Up!</div>
			<div>
				<Players ctx={ctx} gameMetadata={gameMetadata} />
			</div>
			<div>
				<Button variant="primary" onClick={roll}>Roll</Button>
				<RolledDice G={G} />
				<SmallStack G={G} makeSmallBet={makeSmallBet} />
			</div>
			<RaceTrack G={G} />
		</Fragment>
	);

}

export default GameScreen;