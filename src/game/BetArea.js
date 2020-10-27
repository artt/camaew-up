import React from 'react'
import CardStack from './CardStack'

export default function BetArea({bigStack, playerID, makeBigBet}) {

	function allowDrop(e) {
		e.preventDefault();
	}

	function handleBigBetDrop(e, side) {
		e.preventDefault();
		console.log(e)
		// if (e.dataTransfer.getData("type") === "bigbet")
		makeBigBet(playerID, Number(e.dataTransfer.getData("betID")), side)
	}

	const betZoneLose = React.useRef(null)
	const betZoneWin = React.useRef(null)

	function foo(elem, e) {
		console.log(e.dataTransfer.getData("Text"))
		elem.current.classList.toggle('hovering')
	}

	function putEventListeners(elem) {
		const tmp1 = elem.current.addEventListener('dragenter', (e) => foo(elem, e))		
		const tmp2 = elem.current.addEventListener('dragleave', (e) => foo(elem, e))		
		const tmp3 = elem.current.addEventListener('drop', () => elem.current.classList.remove('hovering'))		
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
							onDragEnter={() => console.log('xxxxxxx')}
							dropHandler={(e) => handleBigBetDrop(e, 'win')} />
		</div>

	)

}