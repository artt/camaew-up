import React from 'react'
import RaceTrack from './RaceTrack'
import Players from './Players'
import RolledDice from './RolledDice'
import SmallStack from './SmallStack'
import BetCards from './BetCards'
import BetZone from './BetZone'
import Mod from './Mod'
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
		console.log("bigbet...", playerID, bet, side)
		moves.makeBigBet(playerID, bet, side)
	}

	function placeMod(playerID, cellID, type) {
		console.log("Trying to place mod:", playerID, cellID, type)
		moves.placeMod(playerID, cellID, type)
	}

	function removeMod(playerID) {
		console.log("Remove mod")
		moves.removeMod(playerID)
	}

	function flipMod(playerID, cellID) {
		console.log("Flip mod")
		moves.flipMod(playerID, cellID)
	}

	function moveMod(playerID, newCellID, type) {
		console.log("Move mod")
		moves.moveMod(playerID, newCellID, type)
	}

	// convert string back to number for easier processing
	playerID = Number(playerID)

	return (
		<React.Fragment>
			<div className="section">Camaew Up!</div>
			<div>
				<Players currentPlayer={ctx.currentPlayer} players={G.players} gameMetadata={gameMetadata} />
			</div>
			<div>
				<Button variant="primary" onClick={roll}>Roll</Button>
				<RolledDice dice={G.dice} />
				<SmallStack stack={G.smallStack} makeSmallBet={makeSmallBet} />
				<Mod hasMod={G.players[playerID].modPos === -1} playerID={playerID} />
			</div>
			<RaceTrack
					G={G}
					playerID={playerID}
					gameMetadata={gameMetadata}
					placeMod={placeMod}
					moveMod={moveMod}
					removeMod={removeMod}
					flipMod={flipMod} />
			<div className="flex">
				<BetCards cards={G.players[playerID].betCards} />
				<BetZone stack={G.bigStack} playerID={playerID} makeBigBet={makeBigBet} side="win" />
				<BetZone stack={G.bigStack} playerID={playerID} makeBigBet={makeBigBet} side="lose" />
			</div>
		</React.Fragment>
	);

}

export default GameScreen;