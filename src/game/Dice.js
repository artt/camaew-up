import React from 'react'
import {random} from 'lodash'
import anime from 'animejs/lib/anime.es.js';

import { useEffectListener } from 'bgio-effects/react';

export default function Dice({rollClick, myTurn}) {

	const [dice, setDice] = React.useState(null)
	const [catID, setCatID] = React.useState(null)
	const [btnActive, setBtnActive] = React.useState(myTurn)

	let diceInterval = null

	useEffectListener('roll', (catID) => {
		setCatID(catID)
		diceInterval = setInterval(() => {
			setDice(random(1, 3))
		}, 100)
	});

	// function rollDoneHandler(finalDice) {
	// 	clearInterval(diceInterval)
	// 	setDice(finalDice)
	// 	setZ(false)
	// }
	
	function getCenter(elem) {
		return {x: elem.x + elem.width / 2, y: elem.y + elem.height / 2}
	}

	const rollDoneHandler = React.useCallback(({catID, roll}) => {
		clearInterval(diceInterval)
		setDice(roll)
		setBtnActive(false)
		setTimeout(() => {
			if (document.getElementById('xxx')) {
				const pointA = getCenter(document.getElementById('xxx').getBoundingClientRect())
				const pointB = getCenter(document.getElementById(`rolled-dice-${catID}`).getBoundingClientRect())
				anime({
				  targets: '#xxx',
				  translateX: pointB.x - pointA.x,
				  translateY: pointB.y - pointA.y,
				  scale: 0.2,
				  rotate: '1turn',
				  opacity: 0,
				  duration: 500,
				  easing: 'easeOutExpo'
				});
			}
		}, 500)
	})

	function rollResetHandler() {
		setDice(null)
		setCatID(null)
	}

	React.useEffect(() => {
		setBtnActive(myTurn)
		if (!myTurn) {
			// rollDoneHandler()
			rollResetHandler()
		}
	}, [myTurn])

	useEffectListener('rollDone', (x) => rollDoneHandler(x));
	useEffectListener('rollReset', rollResetHandler);

	return(
		<div id="dice-wrapper" className="center">
			<div id="main-dice" className={`rolled-dice ${btnActive ? 'active' : ''}`}>
				{!dice &&
					<div className="center-table circle-shape empty-area dice-shape-big actionable"
							onClick={() => {
								if (btnActive) {
									rollClick()
								}
							}}>
								Roll
						</div>
				}
			</div>
			{dice &&
				<div id="xxx" className={`center-table dice-shape-big tokencolor-${catID}`}>{dice}</div>
			}
		</div>
	)
}
