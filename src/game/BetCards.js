import React from 'react'



export default function BetCards({G, playerID, makeBigBet}) {

	function drag(e) {
		// console.log(e.target.getAttribute("betID"))
		e.dataTransfer.setData("betID", e.target.getAttribute("betID"))
	}

	return(
		<div>
			<div className="section">Bet Cards</div>
				<div className="flex">
				{
					G.players[playerID].betCards.map((x, i) => {
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