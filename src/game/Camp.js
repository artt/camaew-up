import React from 'react'
import Dice from './Dice'
import CardStack from './CardStack'

import { useEffectListener } from 'bgio-effects/react';

export default function Camp({stack, dice, makeSmallBet, rollClick, myTurn}) {

	const space = 15

	const [diceUI, setDiceUI] = React.useState(dice)

	useEffectListener('rollReset', (finalDice) => {
		setDiceUI(finalDice)
	}, []);

	return(
		<div id="camp">
			{
				[...Array(stack.length)].map((e, i) => {
					return(
						<div id={"tent" + i} className="tent" key={"tent" + i}
								style={{transform: `translateX(-50%) rotate(${-space * (stack.length - 1) / 2 + space * i}deg)`}} >
							<CardStack
									stack={stack[i]}
									stackClass="tentstack"
									cardClass={`tokencolor-${i}`}
									clickHandler={() => {
										if (stack[i].length > 0)
											makeSmallBet(i)
									}}
									myTurn={myTurn}
								/>
							<div id={`rolled-dice-${i}`} className={"dice-shape-small center-margin di-table"}>
								{diceUI[i]
									? <div className={`dice-shape-small center-table tokencolor-${i}`}>{diceUI[i]}</div>
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