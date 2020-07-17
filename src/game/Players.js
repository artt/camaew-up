import React from 'react'
import {ListGroup} from 'react-bootstrap'

function Players({ctx, G, gameMetadata}) {
	console.log(G)
	return(
		<div>
			<ListGroup>
			{
				gameMetadata.map((x, i) => {
					return(
						<ListGroup.Item active={x.id == ctx.currentPlayer}>
							{x.name}
							{
								// G.players[i].smallBets.map(

								// )
							}
						</ListGroup.Item>
					);
				})
			}
			</ListGroup>
		</div>
	)
}

export default Players;