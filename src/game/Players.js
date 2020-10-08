import React from 'react'
import BetCards from './BetCards'
import Mod from './Mod'
import CoinSVG from '../assets/coin.svg';

function SmallBetTable({bets}) {
	return(
		<React.Fragment>
			{
				bets.map((color, j) => {
					return(
						<React.Fragment key={"smallBets" + j}>
							{
								color.map(card => {
									return <div className={`tokencolor-${j} card`}>{card}</div>
								})
							}
						</React.Fragment>
					)
				})
			}
		</React.Fragment>
	)	
}

function Player({name, data}) {
	return(
		<div className="player-card">
			<div>
				<img alt={name || "Player"} src={`https://api.adorable.io/avatars/100/${name || "Player"}.png`} />
			</div>
			<div className="player-details">
				<div>
					{name || "Player"}
				</div>
				<div>
					<img src={CoinSVG} alt="Coins" height={16} /> {data.coins}
				</div>
				<SmallBetTable bets={data.smallBets}/>
			</div>
		</div>
	)
}

export default function Players({playerID, currentPlayer, players, gameMetadata}) {
	return(
		<div>
			{players.map((x, i) => {
				return <Player name={gameMetadata[i].name} data={x} key={"player" + i} />
			})}
			<BetCards cards={players[playerID].betCards} />
			<Mod hasMod={players[playerID].modPos === -1} playerID={playerID} />
		</div>
	)
}
