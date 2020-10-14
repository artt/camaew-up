import React from 'react'
import {random} from 'lodash'

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

	const rollDoneHandler = React.useCallback((finalDice) => {
		clearInterval(diceInterval)
		setDice(finalDice)
		setBtnActive(false)
	})

	function rollResetHandler() {
		setDice(null)
		setCatID(null)
	}

	React.useEffect(() => {
		setBtnActive(myTurn)
		if (!myTurn) {
			rollDoneHandler()
			rollResetHandler()
		}
	}, [myTurn])

	useEffectListener('rollDone', rollDoneHandler);
	useEffectListener('rollReset', rollResetHandler);

	return(
		<div id="dice-wrapper" className="center">
			<div id="main-dice" className={`rolled-dice ${btnActive ? 'active' : ''}`}
					onClick={() => {
						if (btnActive) {
							rollClick()
						}
					}}>
				{dice
					? <div className={`center-table dice-size tokencolor-${catID}`}>{dice}</div>
					: <div className="center-table circle-shape empty-area dice-size">Roll</div>
				}
			</div>
		</div>
	)
}
