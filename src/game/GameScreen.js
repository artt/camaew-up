import React from 'react'
import Players from './Players'
import RaceTrack from './RaceTrack'
import Camp from './Camp'
import BetArea from './BetArea'

import './game.css'

export default function GameScreen({G, ctx, moves, playerID, gameMetadata, gameID, ...rest}) {

	// convert string back to number for easier processing
	playerID = Number(playerID)

	return (
		<div id="game">

			<div className="panel" id="main">
				<Camp
						stack={G.smallStack}
						stackPos={G.smallStackPos}
						dice={G.dice}
						makeSmallBet={bet => moves.makeSmallBet(playerID, bet)}
						rollClick={() => moves.roll(playerID)}
						myTurn={playerID === Number(ctx.currentPlayer)} />
				<BetArea
						bigStack={G.bigStack}
						stackPos={G.bigStackPos}
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