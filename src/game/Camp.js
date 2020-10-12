import React from 'react'
import Dice from './Dice'
import {random} from 'lodash'
import CardStack from './CardStack'

import { useEffectListener } from 'bgio-effects/react';

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
							<CardStack
									stack={stack[i]}
									stackPos={stackPos[i]}
									cardClass={`tokencolor-${i}`}
									clickHandler={() => {
										if (myTurn && stack[i].length > 0)
											makeSmallBet(i)
									}} />
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