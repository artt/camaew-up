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
		<div className={`card-shape betzone betzone-${side} empty-area`} onDragOver={allowDrop} onDrop={drop}>
			<div className="center-table">
				{side[0].toUpperCase()}
				{/*`${side}: ${stack[side].length}`*/}
			</div>
		</div>
	)

}