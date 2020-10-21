import React from 'react'
import Mod from './Mod'
import {ReactComponent as CoinSVG} from '../assets/coin.svg';

function SmallBetTable({bets}) {
	return(
		<div className="flex">
			{
				bets.map((color, j) => {
					return(
						<div className="flex">
							{
								color.map(card => {
									return <div className={`tokencolor-${j} card`} key={"smallbetcard" + card}>{card}</div>
								})
							}
						</div>
					)
				})
			}
		</div>
	)	
}


function BetCards({cards}) {

	function drag(e) {
		e.dataTransfer.setData("betID", e.target.getAttribute("bet_id"))
	}

	return(
		<div>
			<div className="section">Bet Cards</div>
				<div className="flex">
				{
					cards.map((x, i) => {
						if (x) {
							return(
								<div
										className={`tokencolor-${i} betcard`}
										bet_id={i}
										draggable="true"
										onDragStart={drag}
										key={"betCards" + i}>
									X
								</div>
							)
						}
						return null;
					})
				}
			</div>
		</div>
	)
}

function Player({playerID, name, data, isCurrent}) {
	return(
		<div className={`player-card ${isCurrent ? 'current' : ''}`}>
			<div className="player-details fullframe">
				<div>
					{name || "Player"}
				</div>
				<div>
					<CoinSVG /> {data.coins}
				</div>
				<SmallBetTable bets={data.smallBets}/>
			</div>
			<div id={"player-card-" + playerID} className="profile-pic">
				<img alt={name || "Player"} src={`https://api.adorable.io/avatars/100/${name || "Player"}.png`} />
			</div>
		</div>
	)
}

export default function Players({playerID, currentPlayer, players, gameMetadata}) {
	return(
		<div>
			{
				[...Array(players.length)].map((e, i) => {
					const p = (playerID + 1 + i) % players.length
					return <Player
										playerID={p}
										name={gameMetadata[p].name}
										data={players[p]}
										isCurrent={currentPlayer === p}
										key={"player" + p} />
				})
			}
			<BetCards cards={players[playerID].betCards} />
			<Mod hasMod={players[playerID].modPos === -1} playerID={playerID} />
		</div>
	)
}
