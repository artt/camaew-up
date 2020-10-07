import React from 'react'
import {ListGroup} from 'react-bootstrap'
import {random} from 'lodash'

import { useEffectListener } from 'bgio-effects/react';

function SmallStack({stack, tokenID, makeSmallBet}) {

	function handleClick(bet) {
		if (stack.length > 0)
			makeSmallBet(bet)
	}

	return(
		<div className="small-stack" onClick={() => handleClick(tokenID)}>
			<div className="small-card card-blank" />
			{stack.map(x => {
				return(
					<div className={`small-card tokencolor-${tokenID}`}>
						{x}
					</div>
				)
			})}
		</div>
	)
}

export default function Camp({stack, dice, makeSmallBet}) {

	const space = 15

	return(
		<div id="camp">
			{
				[...Array(stack.length)].map((e, i) => {
					return(
						<div className="tent"
								style={{transform: `translateX(-50%) rotate(${-space * (stack.length - 1) / 2 + space * i}deg)`}} >
							<SmallStack stack={stack[i]} tokenID={i} makeSmallBet={makeSmallBet} />
							<div className={`rolled-dice tokencolor-${i}`}>
								<div className="dice-text-wrapper">
									{dice[i]}
								</div>
							</div>
						</div>
					)
				})
			}
		</div>
	)
}