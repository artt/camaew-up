import React from 'react';

export default function Cell({cellData, cell_id, gameMetadata, prePlaceMod, preMoveMod, preFlipMod}) {

	function allowDrop(e) {
		e.preventDefault();
	}

	function drop(e) {
		e.preventDefault();
		prePlaceMod(Number(cell_id), e.dataTransfer.getData("type"), e.dataTransfer.getData("oldCellID"))
	}

	function handleModClick() {
		preFlipMod(Number(cell_id))
	}

	function drag(e) {
		e.dataTransfer.setData("type", "move")
		e.dataTransfer.setData("oldCellID", cell_id)
	}

	return (
		<div className="cell" onDragOver={allowDrop} onDrop={drop}>
			<div className="cell-content">
			{
				cellData.stack.slice(0).reverse().map((x, i) => {
					return(
						<div className={`token tokencolor-${x+1}`} key={"cat_stack" + i}>
							{x}<br />
						</div>
					)
				})
			}
			</div>
			{cellData.mod &&
				<div className={`cell-mod card ${cellData.mod.type}`}
						onClick={handleModClick}
						draggable="true"
						onDragStart={drag}>
					{gameMetadata[cellData.mod.playerID].name}
				</div>
			}
		</div>
	);

}