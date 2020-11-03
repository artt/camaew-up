import React from 'react';
import {addDropListeners} from '../utils'

export default function Cell({cellData, cell_id, isExtra, playerID, gameMetadata, prePlaceMod, preMoveMod, preFlipMod}) {

	function allowDrop(e) {
		e.preventDefault();
	}

	function drop(e) {
		e.preventDefault();
		if (e.dataTransfer.types.includes("type_mod"))
			prePlaceMod(Number(cell_id), e.dataTransfer.getData("type"))
	}

	function handleModClick() {
		preFlipMod(Number(cell_id))
	}

	function drag(e) {
		e.dataTransfer.setData("type_mod", "identifier")
		e.dataTransfer.setData("type", "move")
	}

	const cell = React.useRef(null)

	React.useEffect(() => {
		addDropListeners(cell, "type_mod")
	})

	return (
		<div className={`cell ${isExtra ? 'cell-extra' : ''}`}
				onDragOver={allowDrop}
				onDrop={drop}
				ref={cell}>
			<div className="cell-content">
			{/*
				cellData.stack.slice(0).reverse().map((x, i) => {
					return(
						<div className={`token tokencolor-${x}`} key={"cat_stack" + i}>
							{catEmoji[x]}<br />
						</div>
					)
				})
			*/}
			</div>
			{cellData.mod &&
				<div className={`cell-mod card ${cellData.mod.type}`}
						onClick={handleModClick}
						draggable={playerID === cellData.mod.playerID}
						onDragStart={drag}>
					{gameMetadata[cellData.mod.playerID].name || '–'}
				</div>
			}
		</div>
	);

}