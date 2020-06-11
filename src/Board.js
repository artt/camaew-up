import React from 'react'
import Cell from './Cell'

function Board({G}) {
	return(
		<div className="board">
			{
				G.board.map((cell, i) => <Cell cellData={cell} key={i} />)
			}
		</div>
	)
}

export default Board;

