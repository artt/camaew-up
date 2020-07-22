import React from 'react'



export default function BetCards({cards}) {

	function drag(e) {
		// console.log(e.target.getAttribute("betID"))
		e.dataTransfer.setData("betID", e.target.getAttribute("betID"))
	}

	return(
		<div>
			<div className="section">Bet Cards</div>
				<div className="flex">
				{
					cards.map((x, i) => {
						if (x) {
							return(
								<div
										className={`tokencolor-${i+1} card`}
										betID={i}
										draggable="true"
										onDragStart={drag}>
									X
								</div>
							)
						}
						return null;
					})
				}
			</div>
		</div>
	)
}