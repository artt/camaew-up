import React from 'react'
import Players from './Players'
import RaceTrack from './RaceTrack'
import RolledDice from './RolledDice'
import Camp from './Camp'
import SmallStack from './SmallStack'
import BetZone from './BetZone'
import {Button} from 'react-bootstrap'
import './game.css'

export default function GameScreen2({G, ctx, moves, playerID, gameMetadata, gameID, ...rest}) {

	// convert string back to number for easier processing
	playerID = Number(playerID)
	console.log(ctx)

	return (
		<div id="game">

			<div className="panel" id="main">
				<Camp stack={G.smallStack} dice={G.dice} makeSmallBet={bet => moves.makeSmallBet(playerID, bet)} />
				<RolledDice dice={G.dice} />
				<Button variant="primary" onClick={() => moves.roll(playerID)}>Roll</Button>
				<div>
					<BetZone stack={G.bigStack} playerID={playerID} makeBigBet={moves.makeBigBet} side="lose" />
					<BetZone stack={G.bigStack} playerID={playerID} makeBigBet={moves.makeBigBet} side="win" />
				</div>
			</div>

			<div className="panel" id="players">
				<Players
						playerID={playerID}
						currentPlayer={ctx.currentPlayer}
						players={G.players}
						gameMetadata={gameMetadata} />
			</div>

			<div className="panel" id="board">
				<RaceTrack
						G={G}
						playerID={playerID}
						gameMetadata={gameMetadata}
						placeMod={moves.placeMod}
						moveMod={moves.moveMod}
						removeMod={moves.removeMod}
						flipMod={moves.flipMod} />
			</div>

		</div>
	)
}