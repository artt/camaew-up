import React from 'react'
import Dice from './Dice'
import {random} from 'lodash'

import { useEffectListener } from 'bgio-effects/react';

function SmallStack({stack, stackPos, tokenID, makeSmallBet, myTurn}) {
	return(
		<div className="small-stack" onClick={() => {
				if (myTurn && stack.length > 0)
					makeSmallBet(tokenID)
			}}>
			<div className="card-shape empty-area center" />
			{stack.map((x, i) => {
				return(
					<div
							className={`tent-card card-standard center tokencolor-${tokenID}`}
							key={"small-card" + x}
							style={{transform: `rotate(${stackPos[i][2]}deg) translateX(-50%)`,
									transformOrigin: `0% 50%`}}>
						{x}
					</div>
				)
			})}
		</div>
	)
}

export default function Camp({stack, stackPos, dice, makeSmallBet, rollClick, myTurn}) {

	const space = 15

	const [diceUI, setDiceUI] = React.useState(dice)

	useEffectListener('rollReset', (finalDice) => {
		console.log('reset heard by camp')
		setDiceUI(finalDice)
	}, []);


	return(
		<div id="camp">
			{
				[...Array(stack.length)].map((e, i) => {
					return(
						<div className="tent" key={"tent" + i}
								style={{transform: `translateX(-50%) rotate(${-space * (stack.length - 1) / 2 + space * i}deg)`}} >
							<SmallStack stack={stack[i]} stackPos={stackPos[i]} tokenID={i} makeSmallBet={makeSmallBet} myTurn={myTurn} />
							<div className={`rolled-dice ${diceUI[i] && `tokencolor-${i}`}`}>
								{diceUI[i]
									? <div className="center-table">{diceUI[i]}</div>
									: <div className="center-table circle-shape empty-area"></div>
								}
							</div>
						</div>
					)
				})
			}
			<Dice rollClick={rollClick} myTurn={myTurn} />
		</div>
	)
}