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


function BetCards({cards, playerID, isCurrent, canControl}) {

	function drag(e) {
		e.dataTransfer.setData("type_bigbet", "identifier")
		e.dataTransfer.setData("playerID", playerID)
		e.dataTransfer.setData("betID", e.target.getAttribute("bet_id"))
		e.dataTransfer.effectAllowed = "yyy";
	}

	return(
		<div className="smallbet-stack">
			<div className="flex">
			{
				cards.map((x, i) => {
					if (x) {
						return(
							<div
									className={`card-standard card-shape-small betcard tokencolor-${i}`}
									id={`bigbet-player-${playerID}-card-${i}`}
									style={{right: `${(cards.length - i - 2)*20 + 5}px`}}
									bet_id={i}
									draggable={canControl && isCurrent}
									onDragStart={drag}
									key={"betCards" + i}
									elem_type="bigbet">
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

function Player({playerID, name, data, isCurrent, canControl}) {
	return(
		<div className={`player-card ${isCurrent ? 'current' : ''}`}>

			<BetCards cards={data.betCards} playerID={playerID} isCurrent={isCurrent} canControl={canControl} />

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
										canControl={playerID === p}
										key={"player" + p} />
				})
			}
			<Mod hasMod={players[playerID].modPos === -1} playerID={playerID} />
		</div>
	)
}
