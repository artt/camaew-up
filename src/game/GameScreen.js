import React from 'react'
import RaceTrack from './RaceTrack'
import Players from './Players'
import RolledDice from './RolledDice'
import SmallStack from './SmallStack'
import BetCards from './BetCards'
import BetZone from './BetZone'
import {Button} from 'react-bootstrap'

function GameScreen({G, ctx, moves, playerID, gameMetadata}) {

	function roll() {
		moves.roll()
	}

	function makeSmallBet(bet) {
		moves.makeSmallBet(playerID, bet)
	}

	function makeBigBet(playerID, bet, side) {
		console.log("bigbet...", playerID, bet, side)
		moves.makeBigBet(playerID, bet, side)
	}

	// console.log(gameMetadata)

	return(
		<React.Fragment>
			<div className="section">Camaew Up!</div>
			<div>
				<Players ctx={ctx} G={G} gameMetadata={gameMetadata} />
			</div>
			<div>
				<Button variant="primary" onClick={roll}>Roll</Button>
				<RolledDice G={G} />
				<SmallStack G={G} makeSmallBet={makeSmallBet} />
			</div>
			<RaceTrack G={G} />
			<div>
				<BetCards G={G} playerID={playerID} makeBigBet={makeBigBet} />
				<BetZone G={G} playerID={playerID} makeBigBet={makeBigBet} side="win" />
				<BetZone G={G} playerID={playerID} makeBigBet={makeBigBet} side="lose" />
			</div>
		</React.Fragment>
	);

}

export default GameScreen;