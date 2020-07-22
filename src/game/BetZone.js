import React from 'react'

export default function BetZone({G, playerID, makeBigBet, side}) {

	function allowDrop(e) {
	  e.preventDefault();
	}

	function drop(e) {
		e.preventDefault();
		console.log("dropped", e.dataTransfer.getData("betID"))
		makeBigBet(playerID, Number(e.dataTransfer.getData("betID")), side)
	}

	return(
		<div className="betzone" onDragOver={allowDrop} onDrop={drop}>
			{`${side}: ${G.bigStack[side].length}`}
		</div>
	)

}