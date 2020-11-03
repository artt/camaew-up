import React from 'react'
import {ReactComponent as CoinSVG} from '../assets/coin.svg';
import {sum} from 'lodash'
import Draggable from 'react-draggable'

function SmallBetTable({bets}) {
	return(
		<div className="flex">
			{
				bets.map((color, j) => {
					return(
						<div className="flex" key={`smallbet-table-${j}`}>
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

function BetCards({cards, playerID, isCurrent}) {

	function drag(e) {
		e.dataTransfer.setData("type_bigbet", "identifier")
		e.dataTransfer.setData("playerID", playerID)
		e.dataTransfer.setData("betID", e.target.getAttribute("bet_id"))
	}

	return(
		<div className="smallbet-stack">
			<div className="flex">
			{
				cards.map((x, i) => {
					if (x) {
						return(
							<div
									className={`card-standard card-shape-small betcard tokencolor-${i}` + (isCurrent ? ' actionable' : '')}
									id={`bigbet-player-${playerID}-card-${i}`}
									style={{right: `${(cards.length - i - 2)*20 + 5}px`}}
									bet_id={i}
									draggable={isCurrent}
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

function OtherCards({numCards}) {

	return(
		<div className="smallbet-stack">
			<div className="flex">
			{
				Array(numCards).fill(0).map((x, i) => {
					return(
						<div
								className={`card-standard card-shape-small betcard`}
								style={{right: `${(numCards - i - 2)*20 + 5}px`}}
								bet_id={i}
								key={"betCards" + i}
								elem_type="bigbet">
							X
						</div>
					)
				})
			}
			</div>
		</div>
	)
}

function Mod({hasMod, playerID, isCurrent, canControl}) {

	function drag(e) {
		e.dataTransfer.setData("type_mod", "identifier")
		e.dataTransfer.setData("playerID", e.target.getAttribute("player_id"))
		e.dataTransfer.setData("type", "place")
	}

	return(
			<div
					className="modcard"
					draggable={canControl && isCurrent}
					player_id={playerID}
					onDragStart={drag}
				>
				X
			</div>
	)
}

function Player({playerID, name, data, isCurrent, canControl}) {
	return(
		<div className={`player-card ${isCurrent ? 'current' : ''}`}>

			{canControl
				? <BetCards cards={data.betCards} playerID={playerID} isCurrent={isCurrent} />
				: <OtherCards numCards={sum(data.betCards)} />
			}

			<div className="player-details fullframe">
				<div>
					{name || "Player"}
				</div>
				<div>
					<CoinSVG /> {data.coins}
				</div>
				<SmallBetTable bets={data.smallBets}/>
			</div>

			{data.modPos === -1 &&
				<Mod playerID={playerID} isCurrent={isCurrent} canControl={canControl} />
			}

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
		</div>
	)
}
