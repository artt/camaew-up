import React from 'react'
import {ListGroup} from 'react-bootstrap'

function SmallStack({stack, makeSmallBet}) {
	return(
		<div>
			<div className="section">SmallStack</div>
			<ListGroup horizontal>
			{
				stack.map((x, i) => {
					return(
						<ListGroup.Item className={`tokencolor-${i+1}`} onClick={() => makeSmallBet(i)}>
							{x[x.length - 1]}
						</ListGroup.Item>
					);
				})
			}
			</ListGroup>
		</div>
	)
}

export default SmallStack;