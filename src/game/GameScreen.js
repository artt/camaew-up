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

function GameScreen({G, ctx, moves, playerID, gameMetadata}) {

	function roll() {
		moves.roll(playerID)
	}

	function makeSmallBet(bet) {
		if (G.smallStack[bet].length > 0)
			moves.makeSmallBet(playerID, bet)
	}

	function makeBigBet(playerID, bet, side) {
		// console.log("bigbet...", playerID, bet, side)
		moves.makeBigBet(playerID, bet, side)
	}

	function placeMod(playerID, cellID, type) {
		// console.log("Trying to place mod:", playerID, cellID, type)
		moves.placeMod(playerID, cellID, type)
	}

	function removeMod(playerID) {
		// console.log("Remove mod")
		moves.removeMod(playerID)
	}

	function flipMod(playerID, cellID) {
		// console.log("Flip mod")
		moves.flipMod(playerID, cellID)
	}

	function moveMod(playerID, newCellID, type) {
		// console.log("Move mod")
		moves.moveMod(playerID, newCellID, type)
	}

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
						<Button variant="primary" onClick={roll}>Roll</Button>
						<RolledDice dice={G.dice} />
					</div>
				</div>
				<div className="control">
					<Mod hasMod={G.players[playerID].modPos === -1} playerID={playerID} />
					<SmallStack stack={G.smallStack} makeSmallBet={makeSmallBet} />
					<BetCards cards={G.players[playerID].betCards} />
					<div className="flex">
						<BetZone stack={G.bigStack} playerID={playerID} makeBigBet={makeBigBet} side="lose" />
						<BetZone stack={G.bigStack} playerID={playerID} makeBigBet={makeBigBet} side="win" />
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
					placeMod={placeMod}
					moveMod={moveMod}
					removeMod={removeMod}
					flipMod={flipMod} />
		</React.Fragment>
	);

}

export default GameScreen;