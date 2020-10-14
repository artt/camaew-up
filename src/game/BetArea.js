import React from 'react'
import CardStack from './CardStack'

export default function BetArea({bigStack, playerID, makeBigBet}) {

	function allowDrop(e) {
		e.preventDefault();
	}

	function handleBigBetDrop(e, side) {
		e.preventDefault();
		makeBigBet(playerID, Number(e.dataTransfer.getData("betID")), side)
	}

	return(

		<div id="betarea">
			<CardStack
							label={'L'}
							stackClass={`betzone-lose`}
							stack={Array(bigStack.lose.length).fill('Y')}
							dragOverHandler={allowDrop}
							dropHandler={(e) => handleBigBetDrop(e, 'lose')} />
			<CardStack
							label={'W'}
							stackClass={`betzone-win`}
							stack={Array(bigStack.win.length).fill('Y')}
							dragOverHandler={allowDrop}
							dropHandler={(e) => handleBigBetDrop(e, 'win')} />
		</div>

	)

}