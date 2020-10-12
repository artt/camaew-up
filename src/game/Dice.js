import React from 'react'
import {random} from 'lodash'

import { useEffectListener } from 'bgio-effects/react';

export default function Dice({rollClick, myTurn}) {

	const [dice, setDice] = React.useState(null)
	const [catID, setCatID] = React.useState(null)
	const [rollDone, setRollDone] = React.useState(false)


	let diceInterval = null

	useEffectListener('roll', (catID) => {
		setCatID(catID)
		diceInterval = setInterval(() => {
			setDice(random(1, 3))
		}, 100)
	}, []);

	useEffectListener('rollDone', rollDoneHandler, []);
	useEffectListener('rollReset', rollResetHandler, []);

	function rollDoneHandler(finalDice) {
		console.log('rollDone at ', Date())
		clearInterval(diceInterval)
		setDice(finalDice)
	}

	function rollResetHandler() {
		setDice(null)
		setCatID(null)
		setRollDone(true)
	}

	React.useEffect(() => {
		if (myTurn) {
			setRollDone(false)
		}
		else {
			rollDoneHandler()
			rollResetHandler()
		}
	}, [myTurn])

	const btnActive = myTurn && !(rollDone)

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
