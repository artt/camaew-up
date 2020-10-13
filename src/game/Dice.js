import React from 'react'
import {random} from 'lodash'

import { useEffectListener } from 'bgio-effects/react';

export default function Dice({rollClick, myTurn}) {

	const [dice, setDice] = React.useState(null)
	const [catID, setCatID] = React.useState(null)
	const [rollDone, setRollDone] = React.useState(false)
	const [z, setZ] = React.useState(myTurn)

	let diceInterval = null

	useEffectListener('roll', (catID) => {
		console.log('roll')
		setCatID(catID)
		diceInterval = setInterval(() => {
			setDice(random(1, 3))
		}, 100)
	});

	useEffectListener('rollDone', () => rollDoneHandler());
	useEffectListener('rollReset', (x) => rollResetHandler(x));

	function rollDoneHandler(finalDice) {
		console.log('rollDone at ', Date())
		clearInterval(diceInterval)
		setDice(finalDice)
		setZ(false)
	}

	function rollResetHandler() {
		console.log('rollReset')
		setDice(null)
		setCatID(null)
	}

	React.useEffect(() => {
		if (myTurn) {
			setZ(true)
		}
		else {
			setZ(false)
			rollDoneHandler()
			rollResetHandler()
		}
	}, [myTurn])

	const btnActive = myTurn && !rollDone

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
