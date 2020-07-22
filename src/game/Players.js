import React from 'react'
import {ListGroup} from 'react-bootstrap'

function Players({ctx, G, gameMetadata}) {
	console.log(G)
	return(
		<div className="players">
			<ListGroup>
			{
				gameMetadata.map((x, i) => {
					return(
						<ListGroup.Item active={x.id == ctx.currentPlayer} className="flex">
							{x.name}
							{
								G.players[i].smallBets.map((color, j) => {
									if (color.length > 0) {
										return(
											<React.Fragment>
												{
													color.map(card => {
														return <div className={`tokencolor-${j+1} card`}>{card}</div>
													})
												}
											</React.Fragment>
										)
									}
									return null;
								})
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