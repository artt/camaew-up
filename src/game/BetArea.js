import React from 'react'
import CardStack from './CardStack'
import {random, cloneDeep} from 'lodash'

export default function BetArea({bigStack, stackPos, playerID, makeBigBet}) {

	const jitter = {angle: 7.5, x: 5, y: 5}

	const [posLose, setPosLose] = React.useState([])

	React.useEffect(() => {
		setPosLose(posLose.concat([[random(-jitter.x, jitter.x, true),
														random(-jitter.y, jitter.y, true),
														random(-jitter.angle, jitter.angle, true)]]))
	}, [bigStack.lose])

	function foo() {
		console.log(posLose)
		let tmp = cloneDeep(posLose)
		for (let i = 0; i < tmp.length; i ++) {
			tmp[i] = [random(-jitter.x, jitter.x, true),
														random(-jitter.y, jitter.y, true),
														random(-jitter.angle, jitter.angle, true)]
		}
		setPosLose(tmp)
	}

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
							stackPos={xx || stackPos[side]}
							doubleClickHandler={foo}
							dragOverHandler={allowDrop}
							dropHandler={(e) => handleBigBetDrop(e, side)} />
	}

	return(

		<div className="betarea">
			<S stack={bigStack.lose} xx={posLose} side="lose" />
			<S stack={bigStack.win} side="win" />
		</div>

	)

}