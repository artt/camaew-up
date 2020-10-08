import React from 'react'
import {random} from 'lodash'

import { useEffectListener } from 'bgio-effects/react';

export default function Dice({rollClick}) {

	const [dice, setDice] = React.useState(null)
	const [catID, setCatID] = React.useState(null)

	let diceInterval = null

	useEffectListener('roll', (catID) => {
		setCatID(catID)
		diceInterval = setInterval(() => {
			setDice(random(1, 3))
		}, 100)
	}, []);

	useEffectListener('rollDone', (finalDice) => {
		clearInterval(diceInterval)
		setDice(finalDice)
	}, []);

	useEffectListener('rollReset', (finalDice) => {
		setDice(null)
		setCatID(null)
	}, []);

	return(
		<div id="main-dice" className={`rolled-dice tokencolor-${catID}`} onClick={rollClick}>
			{dice
				? <div className="dice-text-wrapper">{dice}</div>
				: <div className="dice-text-wrapper no-dice">Roll</div>
			}
		</div>
	)
}