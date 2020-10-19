import React from 'react'
import Players from './Players'
import RaceTrack from './RaceTrack'
import Camp from './Camp'
import BetArea from './BetArea'
import { getCenter } from '../utils'

import './game.css'

export default function GameScreen({G, ctx, moves, playerID, gameMetadata, gameID, ...rest}) {


	// convert string back to number for easier processing
	playerID = Number(playerID)
	const myTurn = (playerID === Number(ctx.currentPlayer))

	const misc = {
		numCats: G.numCats,
		spacing: G.spacing,
	}

	const [pos, setPos] = React.useState({
		tents: Array(G.numCats).fill([0, 0]),
		players: Array(G.numPlayers).fill([0, 0])
	})

	// React.useEffect(() => {
	// 	function resizeHandler() {
	// 		let tmp = {
	// 			tents: Array(G.numCats).fill([0, 0]),
	// 			players: Array(G.numPlayers).fill([0, 0])
	// 		}
	// 		for (let i = 0; i < G.numCats; i ++) {
	// 			tmp.tents[i] = getCenter(document.getElementById(`tentstack-${i}`).getBoundingClientRect())
	// 		}
	// 		for (let i = 0; i < G.numPlayers; i ++) {
	// 			tmp.players[i] = getCenter(document.getElementById(`player-card-${i}`).getBoundingClientRect())
	// 		}
	// 		setPos(tmp)
	// 	}
	// 	resizeHandler()
	// 	window.addEventListener('resize', resizeHandler)
	// }, [])

	return (
		<div id="game" className={myTurn ? 'myturn' : ''}>
			{/*<div className="motion-path">
			{document.getElementById('tentstack-0') !== null &&
				[...Array(G.numCats)].map((e, i) => {
					return(
						<React.Fragment>
						{
							[...Array(G.numPlayers)].map((f, j) => {
								return(
									<svg width="5000" height="5000" id={`path-smallbet-${i}-player-${j}`}>
										<path d={`M ${pos.tents[i].x} ${pos.tents[i].y} L ${pos.players[j].x} ${pos.players[j].y}`} stroke="red" strokeWidth="3" />
									</svg>
								)
							})
						}
						</React.Fragment>
					)
				})
			}
			</div>*/}
			<div className="panel" id="main">
				<Camp
						stack={G.smallStack}
						dice={G.dice}
						makeSmallBet={bet => moves.makeSmallBet(playerID, bet)}
						rollClick={() => moves.roll(playerID)}
						myTurn={myTurn}
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