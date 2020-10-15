import React from 'react'
import Players from './Players'
import RaceTrack from './RaceTrack'
import Camp from './Camp'
import BetArea from './BetArea'

import './game.css'

export default function GameScreen({G, ctx, moves, playerID, gameMetadata, gameID, ...rest}) {

	// convert string back to number for easier processing
	playerID = Number(playerID)

	const misc = {
		numCats: G.numCats,
		spacing: G.spacing,
	}

	return (
		<div id="game" className={playerID === Number(ctx.currentPlayer) ? 'myturn' : ''}>

			<div className="panel" id="main">
				<Camp
						stack={G.smallStack}
						dice={G.dice}
						makeSmallBet={bet => moves.makeSmallBet(playerID, bet)}
						rollClick={() => moves.roll(playerID)}
						myTurn={playerID === Number(ctx.currentPlayer)}
						misc={misc} />
				<BetArea
						bigStack={G.bigStack}
						playerID={playerID}
						makeBigBet={moves.makeBigBet} />			
			</div>

			<div className="panel" id="players">
				<Players
						playerID={playerID}
						currentPlayer={Number(ctx.currentPlayer)}
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