import React from 'react'
import CardStack from './CardStack'

export default function BetArea({bigStack, stackPos, playerID, makeBigBet}) {

	function allowDrop(e) {
		e.preventDefault();
	}

	function handleBigBetDrop(e, side) {
		e.preventDefault();
		makeBigBet(playerID, Number(e.dataTransfer.getData("betID")), side)
	}

	function S({side}) {
		return <CardStack
							stackClass={`betzone-${side}`}
							stack={bigStack[side]}
							stackPos={stackPos[side]}
							dragOverHandler={allowDrop}
							dropHandler={(e) => handleBigBetDrop(e, side)} />
	}

	return(

		<div className="betarea">
			<S side="lose" />
			<S side="win" />
		</div>

	)

}