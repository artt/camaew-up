import React from 'react'

export default function BetZone({stack, playerID, makeBigBet, side}) {

	function allowDrop(e) {
	  e.preventDefault();
	}

	function drop(e) {
		e.preventDefault();
		makeBigBet(playerID, Number(e.dataTransfer.getData("betID")), side)
	}

	return(
		<div className={`betzone betzone-${side}`} onDragOver={allowDrop} onDrop={drop}>
			{`${side}: ${stack[side].length}`}
		</div>
	)

}