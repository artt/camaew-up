import React from 'react';

export default function Cell({className, cellData, cell_id, playerID, gameMetadata, prePlaceMod, preMoveMod, preFlipMod}) {

	function allowDrop(e) {
		e.preventDefault();
	}

	function drop(e) {
		e.preventDefault();
		prePlaceMod(Number(cell_id), e.dataTransfer.getData("type"))
	}

	function handleModClick() {
		preFlipMod(Number(cell_id))
	}

	function drag(e) {
		e.dataTransfer.setData("type", "move")
	}

	return (
		<div className={"cell " + className} onDragOver={allowDrop} onDrop={drop}>
			<div className="cell-content">
			{
				cellData.stack.slice(0).reverse().map((x, i) => {
					return(
						<div className={`token tokencolor-${x}`} key={"cat_stack" + i}>
							X<br />
						</div>
					)
				})
			}
			</div>
			{cellData.mod &&
				<div className={`cell-mod card ${cellData.mod.type}`}
						onClick={handleModClick}
						draggable={playerID === cellData.mod.playerID}
						onDragStart={drag}>
					{gameMetadata[cellData.mod.playerID].name}
				</div>
			}
		</div>
	);

}