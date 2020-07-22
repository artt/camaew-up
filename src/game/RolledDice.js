import React from 'react'
import {ListGroup} from 'react-bootstrap'

export default function RolledDice({dice}) {
	return(
		<div>
			<div className="section">Rolled dice</div>
			<ListGroup horizontal>
			{
				dice.map((x, i) => {
					return(
						<ListGroup.Item className={`tokencolor-${i+1}`}>{x}</ListGroup.Item>
					);
				})
			}
			</ListGroup>
		</div>
	)
}