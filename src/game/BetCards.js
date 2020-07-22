import React from 'react'



export default function BetCards({cards}) {

	function drag(e) {
		// console.log(e.target.getAttribute("betID"))
		e.dataTransfer.setData("betID", e.target.getAttribute("bet_id"))
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
										bet_id={i}
										draggable="true"
										onDragStart={drag}
										key={"betCards" + i}>
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