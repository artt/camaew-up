import React from 'react'
import {random} from 'lodash'

import { useEffectListener } from 'bgio-effects/react';

export default function Dice({rollClick, myTurn}) {

	const [dice, setDice] = React.useState(null)
	const [catID, setCatID] = React.useState(null)
	const [rollClicked, setRollClicked] = React.useState(false)
	const [rollDone, setRollDone] = React.useState(false)


	let diceInterval = null

	useEffectListener('roll', (catID) => {
		setRollClicked(true)
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
		setRollDone(true)
		setDice(finalDice)
	}

	function rollResetHandler() {
		setDice(null)
		setCatID(null)
		setRollDone(false)
		setRollClicked(false)
	}

	React.useEffect(() => {
		if (myTurn) {
			setRollClicked(false)
			setRollDone(false)
		}
		else {
			rollDoneHandler()
			rollResetHandler()
		}
	}, [myTurn])

	const btnActive = myTurn && !(rollDone && rollClicked)
	// console.log(myTurn, rollDone, rollClicked)

	return(
		<div id="dice-wrapper" className="center">
			<div id="main-dice" className={`rolled-dice ${btnActive ? 'active' : ''}`}
					onClick={() => {
						if (btnActive) 
							rollClick()
					}}>
				{dice
					? <div className={`dice-text-wrapper dice-size tokencolor-${catID}`}>{dice}</div>
					: <div className="dice-text-wrapper circle-shape empty-area dice-size">Roll</div>
				}
			</div>
		</div>
	)
}
