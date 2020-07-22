import React from 'react'

export default function Mod() {

	function drag(e) {
		console.log("cxx")
		// e.dataTransfer.setData("betID", e.target.getAttribute("betID"))
	}

	return(
		<div>
			<div className="section">Mod Tile</div>
				<div className="flex">
					<div
							className="card"
							draggable="true"
							onDragStart={drag}>
						X
					</div>
			</div>
		</div>
	)
}