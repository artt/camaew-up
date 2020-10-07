import React from 'react'
import {ListGroup} from 'react-bootstrap'

export default function SmallStack({stack, makeSmallBet}) {

	function handleClick(bet) {
		if (stack[bet].length > 0)
			makeSmallBet(bet)
	}

	return(
		<div>
			<div className="section">SmallStack</div>
			<ListGroup horizontal>
			{
				stack.map((x, i) => {
					return(
						<ListGroup.Item className={`tokencolor-${i}`} onClick={() => handleClick(i)} key={i}>
							{x[x.length - 1]}
						</ListGroup.Item>
					);
				})
			}
			</ListGroup>
		</div>
	)

}
