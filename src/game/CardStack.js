import React from 'react'

export default function CardStack({stack, stackPos, cardClass, clickHandler, dropHandler}) {

	return(
		<div className="small-stack" onClick={clickHandler}>
			<div className="card-shape empty-area center" />
			{stack.map((x, i) => {
				return(
					<div
							className={`card-standard center ` + (cardClass || '')}
							key={"small-card" + x}
							style={{transform: `rotate(${stackPos ? stackPos[i][2] : 0}deg) translateX(-50%)`,
									transformOrigin: `0% 50%`}}>
						{x}
					</div>
				)
			})}
		</div>
	)

}