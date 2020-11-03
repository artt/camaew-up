import React from 'react'
import CardStack from './CardStack'
import {addDropListeners} from '../utils'

export default function BetArea({bigStack, playerID, makeBigBet}) {

	function allowDrop(e) {
		e.preventDefault();
	}

	function handleBigBetDrop(e, side) {
		e.preventDefault();
		if (e.dataTransfer.types.includes("type_bigbet"))
			makeBigBet(playerID, Number(e.dataTransfer.getData("betID")), side)
	}

	const betZoneLose = React.useRef(null)
	const betZoneWin = React.useRef(null)

	React.useEffect(() => {
		addDropListeners(betZoneLose, "type_bigbet")
		addDropListeners(betZoneWin, "type_bigbet")
	}, [])

	return(

		<div id="betarea">
			<CardStack
							stackRef={betZoneLose}
							label={'L'}
							stackClass={`betzone-lose`}
							stack={Array(bigStack.lose.length).fill('Y')}
							dragOverHandler={allowDrop}
							dropHandler={(e) => handleBigBetDrop(e, 'lose')} />
			<CardStack
							stackRef={betZoneWin}
							label={'W'}
							stackClass={`betzone-win`}
							stack={Array(bigStack.win.length).fill('Y')}
							dragOverHandler={allowDrop}
							dropHandler={(e) => handleBigBetDrop(e, 'win')} />
		</div>

	)

}