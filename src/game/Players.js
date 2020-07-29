import React from 'react'
import {ListGroup} from 'react-bootstrap'

export default function Players({currentPlayer, players, gameMetadata}) {
	return(
		<div className="players">
			<ListGroup>
			{
				gameMetadata.map((x, i) => {
					return(
						<ListGroup.Item active={x.id === Number(currentPlayer)} className="flex" key={"player" + i}>
							{`${x.name} (${players[i].coins})`}
							{
								players[i].smallBets.map((color, j) => {
									return(
										<React.Fragment key={"smallBets" + j}>
											{
												color.map(card => {
													return <div className={`tokencolor-${j} card`} key={"smallBet" + i}>{card}</div>
												})
											}
										</React.Fragment>
									)
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
