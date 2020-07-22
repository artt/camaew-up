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
		moves.roll()
	}

	function makeSmallBet(bet) {
		moves.makeSmallBet(playerID, bet)
	}

	function makeBigBet(playerID, bet, side) {
		console.log("bigbet...", playerID, bet, side)
		moves.makeBigBet(playerID, bet, side)
	}

	function placeMod(playerID, key, type) {
		console.log("Trying to place mod:", playerID, key, type)
		if (G.board[key-1].mod !== null || G.board[key+1].mod !== null) {
			console.error("Cannot place mod adjacent to older mods.")
			return
		}
		if (!G.players[playerID].hasMod) {
			console.error("Player has already placed his/her mod.")
			return
		}
		if (G.board[key].stack.length > 0) {
			console.error("Cannot place mod where cats are.")
			return
		}
		moves.placeMod(playerID, key, type)
	}

	function removeMod(playerID, key) {
		moves.removeMod(playerID, key)
	}

	return(
		<React.Fragment>
			<div className="section">Camaew Up!</div>
			<div>
				<Players currentPlayer={ctx.currentPlayer} players={G.players} gameMetadata={gameMetadata} />
			</div>
			<div>
				<Button variant="primary" onClick={roll}>Roll</Button>
				<RolledDice dice={G.dice} />
				<SmallStack stack={G.smallStack} makeSmallBet={makeSmallBet} />
				<Mod hasMod={G.players[playerID].hasMod} playerID={playerID} />
			</div>
			<RaceTrack board={G.board} placeMod={placeMod} removeMod={removeMod} />
			<div className="flex">
				<BetCards cards={G.players[playerID].betCards} />
				<BetZone stack={G.bigStack} playerID={playerID} makeBigBet={makeBigBet} side="win" />
				<BetZone stack={G.bigStack} playerID={playerID} makeBigBet={makeBigBet} side="lose" />
			</div>
		</React.Fragment>
	);

}

export default GameScreen;