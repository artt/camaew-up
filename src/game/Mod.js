import React from 'react'

export default function Mod({hasMod, playerID}) {

	function drag(e) {
		e.dataTransfer.setData("playerID", e.target.getAttribute("player_id"))
		e.dataTransfer.setData("type", "place")
	}

	return(
		<div>
			<div className="section">Mod Tile</div>
				<div className="flex">
					<div
							className="modcard"
							draggable={hasMod}
							player_id={playerID}
							onDragStart={drag}>
						{hasMod ? "X" : "–"}
					</div>
			</div>
		</div>
	)
}