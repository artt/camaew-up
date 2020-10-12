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
			<div className="card-shape empty-area di-table">
				<div className="center-table">
					{side[0].toUpperCase()}
					{/*`${side}: ${stack[side].length}`*/}
				</div>
			</div>
			{
				stack.map((x, i) => {
					return(
						<div className="card-shape">x</div>
					)
				})
			}
		</div>
	)

}