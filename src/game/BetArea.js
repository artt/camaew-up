import React from 'react'
import CardStack from './CardStack'

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

	function customDragHandler(elem, e) {
		if (e.dataTransfer.types.includes("type_bigbet"))
			elem.current.classList.toggle('hovering')
	}

	function customDropHandler(elem, e) {
		if (e.dataTransfer.types.includes("type_bigbet"))
			elem.current.classList.remove('hovering')
	}

	function putEventListeners(elem) {
		const tmp1 = elem.current.addEventListener('dragenter', (e) => customDragHandler(elem, e))		
		const tmp2 = elem.current.addEventListener('dragleave', (e) => customDragHandler(elem, e))		
		const tmp3 = elem.current.addEventListener('drop', (e) => customDropHandler(elem, e))		
		return () => {
			elem.current.removeEventListener(tmp1)
			elem.current.removeEventListener(tmp2)
			elem.current.removeEventListener(tmp3)
		}
	}

	React.useEffect(() => {
		putEventListeners(betZoneLose)
		putEventListeners(betZoneWin)
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