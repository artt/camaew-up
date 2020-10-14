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
		return {x: (elem.left + elem.right) / 2, y: (elem.top + elem.bottom) / 2}
		// return {x: elem.x + elem.width / 2, y: elem.y + elem.height / 2}
	}

	const rollDoneHandler = React.useCallback(({catID, roll}) => {
		clearInterval(diceInterval)
		setDice(roll)
		setBtnActive(false)
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
	useEffectListener('rollMove', (catID) => {
		const space = 15
		const numCats = 5
		const pointA = getCenter(document.getElementById('rolled-dice').getBoundingClientRect())
		const pointB = getCenter(document.getElementById(`rolled-dice-${catID}`).getBoundingClientRect())
		if (document.getElementById('rolled-dice')) {
			anime({
				targets: '#rolled-dice',
				// need to fix this
				translateX: [-30, pointB.x - pointA.x - 20],
				translateY: [0, pointB.y - pointA.y + 10],
				height: ['60px', '40px'],
				width: ['60px', '40px'],
				borderRadius: ['10px', '7px'],
				rotate: `${-space * (numCats - 1) / 2 + space * catID + 360}deg`,
				duration: 600,
				easing: 'easeOutElastic'
			});
		}
	})

	return(
		<div id="dice-wrapper" className="center">
			<div id="main-dice" className={"fill " + (btnActive ? 'active' : '')}>
				<div className="center circle-shape empty-area dice-shape-big actionable"
						onClick={() => {
							if (!dice && btnActive) {
								rollClick()
							}
						}}>
					<div className="di-table fullframe">
						<div className="center-table">
							Roll
						</div>
					</div>
				</div>
				{dice &&
					<div id="rolled-dice" className={`center dice-shape-big tokencolor-${catID}`}>
						<div className="di-table fullframe">
							<div className="center-table">
								{dice}
							</div>
						</div>
					</div>
				}
			</div>
		</div>
	)
}
