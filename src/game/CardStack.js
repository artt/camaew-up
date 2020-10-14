import React from 'react'
import { random } from 'lodash'
import { useEffectListener } from 'bgio-effects/react';

export default function CardStack({label, stack, cardClass, stackClass, clickHandler, doubleClickHandler, dragOverHandler, dropHandler}) {

	const [z, setZ] = React.useState([])
	const [oldLength, setOldLength] = React.useState(0)

	function genRandomArray(l) {
		let tmp = Array(l)
		for (let i = 0; i < l; i ++) {
			tmp[i] = random(-7.5, 7.5, true)
		}
		return tmp
	}

	React.useEffect(() => {
		if (stack.length > oldLength) {
			setZ(z => z.concat(genRandomArray(stack.length - oldLength)))
		}
		else {
			setZ(z => z.slice(0, stack.length))
		}
		setOldLength(stack.length)
	}, [stack, oldLength])

	useEffectListener('endSmallRound', () => {
		setZ(genRandomArray(stack.length))
	})

	// listen to event that would random thie thing

	return(
		<div className={"small-stack " + (stackClass || '')}
				onClick={clickHandler}
				onDragOver={dragOverHandler}
				onDrop={dropHandler}>
			<div className="card-shape empty-area center di-table">
				<div className="center-table">
					{label}
				</div>
			</div>
			{stack.map((x, i) => {
				return(
					<div
							className={"card-standard card-shape center di-table " + (cardClass || '')}
							key={"small-card" + i}
							style={{transform: `rotate(${z ? z[i] : 0}deg) translateX(-50%)`,
									transformOrigin: `0% 50%`}}>
						<div className="center-table">
							{x}
						</div>
					</div>
				)
			})}
		</div>
	)

}