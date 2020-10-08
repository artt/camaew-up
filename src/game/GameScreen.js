import React from 'react'
import Players from './Players'
import RaceTrack from './RaceTrack'
import Camp from './Camp'
import BetZone from './BetZone'

import './game.css'

export default function GameScreen2({G, ctx, moves, playerID, gameMetadata, gameID, ...rest}) {

	// convert string back to number for easier processing
	playerID = Number(playerID)

	return (
		<div id="game">

			<div className="panel" id="main">
				<Camp
						stack={G.smallStack}
						dice={G.dice}
						makeSmallBet={bet => moves.makeSmallBet(playerID, bet)}
						rollClick={() => moves.roll(playerID)}/>
				<div className="betarea">
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