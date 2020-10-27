import React from 'react'
import Dice from './Dice'
import CardStack from './CardStack'
import anime from 'animejs/lib/anime.es.js';
import { getTranslate, getRotation, deg2rad } from '../utils'

import { useEffectListener } from 'bgio-effects/react';

export default function Camp({stack, dice, makeSmallBet, rollClick, myTurn, misc}) {

	const space = 15

	const [diceUI, setDiceUI] = React.useState(dice)

	function getCardTranslate(tentID, playerID, misc) {
		const [dx, dy] = getTranslate(`tentstack-${tentID}`, `player-card-${playerID}`)
		const a = Math.sqrt(dx*dx + dy*dy)
		const theta = -deg2rad(getRotation(misc, tentID))
		const alpha = Math.atan2(dy, dx)
		const beta = Math.PI / 2 - alpha - theta
		return [a * Math.sin(beta), a * Math.cos(beta)]
	}

	useEffectListener('rollReset', (finalDice) => {
		setDiceUI(finalDice)
	}, []);

	useEffectListener('makeSmallBet', ({playerID, bet, card}) => {
		const [dx, dy] = getCardTranslate(bet, playerID, misc)
		const xxx = document.getElementById(`tentstack-${bet}-card-${card}`)
		if (xxx) {
			anime({
				targets: `#tentstack-${bet}-card-${card}`,
				translateX: [0, dx],
				translateY: [0, dy],
				rotate: [
					{value: 0, duration: 200},
					{value: '1turn'}
				],
				opacity: [
					{value: 1, duration: 200},
					{value: 0}
				],
				scale: [
					{value: 1, duration: 200},
					{value: 0.5}
				],
				duration: 300,
				easing: 'easeOutSine'
			});
		}
	})


	return(
		<div id="camp">
			{
				[...Array(stack.length)].map((e, ii) => {
					const i = misc.numCats - 1 - ii
					return(
						<div id={"tent" + i} className="tent" key={"tent" + i}
								style={{transform: `translateX(-50%) rotate(${getRotation(misc, i)}deg)`}} >
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
			<Dice rollClick={rollClick} myTurn={myTurn} misc={misc} />
		</div>
	)
}