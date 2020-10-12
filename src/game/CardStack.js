import React from 'react'

export default function CardStack({stack, stackPos, cardClass, stackClass, clickHandler, dragOverHandler, dropHandler}) {

	return(
		<div className={"small-stack " + (stackClass || '')} onClick={clickHandler} onDragOver={dragOverHandler} onDrop={dropHandler}>
			<div className="card-shape empty-area center" />
			{stack.map((x, i) => {
				return(
					<div
							className={"card-standard center " + (cardClass || '')}
							key={"small-card" + i}
							style={{transform: `rotate(${stackPos ? stackPos[i][2] : 0}deg) translateX(-50%)`,
									transformOrigin: `0% 50%`}}>
						{x}
					</div>
				)
			})}
		</div>
	)

}