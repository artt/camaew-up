import React from 'react'
import { random } from 'lodash'
import { useEffectListener } from 'bgio-effects/react';

export default function CardStack({label, stack, emptyID, cardClass, stackClass, clickHandler, dragOverHandler, dropHandler, myTurn, stackRef}) {

	const [stackPos, setStackPos] = React.useState([])
	const [oldLength, setOldLength] = React.useState(0)

	function genRandomArray(l) {
		let tmp = Array(l)
		for (let i = 0; i < l; i ++) {
			tmp[i] = random(-7.5, 7.5, true)
			// tmp[i] = random(0, 0, true)
		}
		return tmp
	}

	React.useEffect(() => {
		if (stack.length > oldLength) {
			setStackPos(stackPos => stackPos.concat(genRandomArray(stack.length - oldLength)))
		}
		else {
			setStackPos(stackPos => stackPos.slice(0, stack.length))
		}
		setOldLength(stack.length)
	}, [stack, oldLength])

	useEffectListener('endSmallRound', () => {
		setStackPos(genRandomArray(stack.length))
	})

	// listen to event that would random thie thing

	return(
		<div className={"small-stack " + (stackClass || '')}
				onClick={(clickHandler && myTurn) ? clickHandler : () => setStackPos(genRandomArray(stack.length))}
				onDragOver={dragOverHandler}
				onDrop={dropHandler}
				ref={stackRef}>
			<div className="indicator center-both" />
			<div id={emptyID} className="card-shape empty-area center di-table">
				<div className="center-table">
					{label}
				</div>
			</div>
			{stack.map((x, i) => {
				return(
					<div className="center" key={"small-card" + i}>
						<div id={emptyID + "-card-" + x} className="card-wrapper">
							<div
									className={"card-standard card-shape di-table " + (myTurn ? 'actionable ' : '') + (cardClass || '')}
									style={{transform: `translateY(-10px) rotate(${stackPos ? stackPos[i] : 0}deg)`}}>
								<div className="center-table">
									{x}
								</div>
							</div>
						</div>
					</div>
				)
			})}
		</div>
	)

}