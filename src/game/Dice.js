import React from 'react'
import {random} from 'lodash'

import { useEffectListener } from 'bgio-effects/react';

export default function Dice({rollClick, myTurn}) {

	const [dice, setDice] = React.useState(null)
	const [catID, setCatID] = React.useState(null)
	const [z, setZ] = React.useState(myTurn)

	let diceInterval = null

	useEffectListener('roll', (catID) => {
		console.log('roll')
		setCatID(catID)
		diceInterval = setInterval(() => {
			setDice(random(1, 3))
		}, 100)
	});

	useEffectListener('rollDone', rollDoneHandler);
	useEffectListener('rollReset', rollResetHandler);

	function rollDoneHandler(finalDice) {
		clearInterval(diceInterval)
		setDice(finalDice)
		setZ(false)
	}

	function rollResetHandler() {
		setDice(null)
		setCatID(null)
	}

	React.useEffect(() => {
		setZ(myTurn)
		if (!myTurn) {
			rollDoneHandler()
			rollResetHandler()
		}
	}, [myTurn])

	return(
		<div id="dice-wrapper" className="center">
			<div id="main-dice" className={`rolled-dice ${z ? 'active' : ''}`}
					onClick={() => {
						if (z) {
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
