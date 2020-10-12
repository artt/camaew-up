import React from 'react'
import {random, cloneDeep} from 'lodash'

export default function CardStack({label, stack, stackPos, cardClass, stackClass, clickHandler, doubleClickHandler, dragOverHandler, dropHandler}) {

	return(
		<div className={"small-stack " + (stackClass || '')}
				onClick={clickHandler}
				onDoubleClick={doubleClickHandler}
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
							style={{transform: `rotate(${stackPos ? stackPos[i][2] : 0}deg) translateX(-50%)`,
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