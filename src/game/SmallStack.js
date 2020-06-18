import React from 'react'
import {Button, ListGroup} from 'react-bootstrap'

function SmallStack({G, makeSmallBet}) {
	return(
		<div>
			SmallStack
			<ListGroup horizontal>
			{
				G.smallStack.map((x, i) => {
					return(
						<ListGroup.Item className={`tokencolor-${i+1}`} onClick={() => makeSmallBet(i)}>{x[x.length - 1]}</ListGroup.Item>
					);
				})
			}
			</ListGroup>
		</div>
	)
}

export default SmallStack;