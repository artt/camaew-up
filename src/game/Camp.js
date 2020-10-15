import React from 'react'
import Dice from './Dice'
import CardStack from './CardStack'
import anime from 'animejs/lib/anime.es.js';
import { getTranslate } from '../utils'

import { useEffectListener } from 'bgio-effects/react';

export default function Camp({stack, dice, makeSmallBet, rollClick, myTurn}) {

	const space = 15

	const [diceUI, setDiceUI] = React.useState(dice)

	useEffectListener('rollReset', (finalDice) => {
		setDiceUI(finalDice)
	}, []);

	useEffectListener('makeSmallBet', ({playerID, bet, card}) => {
		console.log(`tentstack-${bet}-card-${card}`)
		const [dx, dy] = getTranslate(`tentstack-${bet}`, `player-card-${playerID}`)
		console.log(dx, dy)
		if (document.getElementById(`tentstack-${bet}-card-${card}`)) {
			anime({
				targets: `#tentstack-${bet}-card-${card}`,
				// need to fix this				
				translateX: [0, 50],
				// translateY: [0, 50],
				// height: ['60px', '40px'],
				// width: ['60px', '40px'],
				// borderRadius: ['10px', '7px'],
				// rotate: `${-space * (numCats - 1) / 2 + space * catID + 360}deg`,
				duration: 600,
				easing: 'easeOutElastic'
			});
		}
	})


	return(
		<div id="camp">
			{
				[...Array(stack.length)].map((e, i) => {
					return(
						<div id={"tent" + i} className="tent" key={"tent" + i}
								style={{transform: `translateX(-50%) rotate(${-space * (stack.length - 1) / 2 + space * i}deg)`}} >
							<CardStack
									stack={stack[i]}
									emptyID={"tentstack-" + i}
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