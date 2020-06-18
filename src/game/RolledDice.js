import React from 'react'
import {Button, ListGroup} from 'react-bootstrap'

function SmallStack({G, ctx}) {
	return(
		<div>
			Rolled dice
			<ListGroup horizontal>
			{
				G.dice.map((x, i) => {
					return(
						<ListGroup.Item className={`tokencolor-${i+1}`}>{x}</ListGroup.Item>
					);
				})
			}
			</ListGroup>
		</div>
	)
}

export default SmallStack;