import React from 'react'
import Cell from './Cell'

export default function RaceTrack({board}) {
	return(
		<div className="board">
			{
				board.map((cell, i) => <Cell cellData={cell} key={i} />)
			}
		</div>
	)
}

RaceTrack;