import React from 'react'
import RaceTrack from './RaceTrack'
import Players from './Players'
import RolledDice from './RolledDice'
import SmallStack from './SmallStack'
import BetCards from './BetCards'
import BetZone from './BetZone'
import Mod from './Mod'
import LogArea from './LogArea'
import {Button} from 'react-bootstrap'

export default function GameScreen({G, ctx, moves, playerID, gameMetadata, gameID, ...rest}) {

	// convert string back to number for easier processing
	playerID = Number(playerID)

	return (
		<React.Fragment>
			<div className="flex">
				<div className="control">
					<div className="section">Camaew Up!</div>
					<div>
						<Players currentPlayer={ctx.currentPlayer} players={G.players} gameMetadata={gameMetadata} />
					</div>
					<div>
						<Button variant="primary" onClick={() => moves.roll(playerID)}>Roll</Button>
						<RolledDice dice={G.dice} />
					</div>
				</div>
				<div className="control">
					<Mod hasMod={G.players[playerID].modPos === -1} playerID={playerID} />
					<SmallStack stack={G.smallStack} makeSmallBet={bet => moves.makeSmallBet(playerID, bet)} />
					<BetCards cards={G.players[playerID].betCards} />
					<div className="flex">
						<BetZone stack={G.bigStack} playerID={playerID} makeBigBet={moves.makeBigBet} side="lose" />
						<BetZone stack={G.bigStack} playerID={playerID} makeBigBet={moves.makeBigBet} side="win" />
					</div>
				</div>
				<div className="control">
					<LogArea logArray={G.logArray} gameMetadata={gameMetadata} />
				</div>
			</div>
			<RaceTrack
					G={G}
					playerID={playerID}
					gameMetadata={gameMetadata}
					placeMod={moves.placeMod}
					moveMod={moves.moveMod}
					removeMod={moves.removeMod}
					flipMod={moves.flipMod} />
		</React.Fragment>
	);

}
