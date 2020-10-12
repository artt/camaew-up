import React from 'react'
import CardStack from './CardStack'
import {random, cloneDeep} from 'lodash'

export default function BetArea({bigStack, stackPos, playerID, makeBigBet}) {

	function allowDrop(e) {
		e.preventDefault();
	}

	function handleBigBetDrop(e, side) {
		e.preventDefault();
		makeBigBet(playerID, Number(e.dataTransfer.getData("betID")), side)
	}

	function S({stack, xx, side}) {
		return <CardStack
							label={side[0].toUpperCase()}
							stackClass={`betzone-${side}`}
							stack={Array(stack.length).fill('Y')}
							stackPos={stackPos[side]}
							dragOverHandler={allowDrop}
							dropHandler={(e) => handleBigBetDrop(e, side)} />
	}

	return(

		<div className="betarea">
			<S stack={bigStack.lose} side="lose" />
			<S stack={bigStack.win} side="win" />
		</div>

	)

}