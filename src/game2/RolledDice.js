import React from 'react'
import {ListGroup} from 'react-bootstrap'
import {random} from 'lodash'

import { useEffectListener } from 'bgio-effects/react';

export default function RolledDice({dice}) {

	const [diceUI, setDiceUI] = React.useState(dice)

	function replaceElement(array, index, value) {
		let tmp = array.slice()
		tmp[index] = value
		return tmp
	}

	let diceInterval = null

	useEffectListener('roll', ({catID, preDice}) => {
		diceInterval = setInterval(() => {
			setDiceUI(replaceElement(preDice, catID, random(1, 3)))
		}, 100)
	}, []);

	useEffectListener('rollDone', (finalDice) => {
		clearInterval(diceInterval)
		setDiceUI(finalDice)
	}, []);

	return(
		<div>
			<div className="section">Rolled dice</div>
			<ListGroup horizontal>
			{
				diceUI.map((x, i) => {
					return(
						<ListGroup.Item className={`tokencolor-${i}`} key={i}>
							{x}
						</ListGroup.Item>
					);
				})
			}
			</ListGroup>
		</div>
	)
}