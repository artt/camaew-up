import React from 'react';

export default function Cell({cellData, cell_id, prePlaceMod}) {

	function allowDrop(e) {
	  e.preventDefault();
	}

	function drop(e) {
		e.preventDefault();
		console.log("dropped", e.dataTransfer.getData("playerID"))
		prePlaceMod(e.dataTransfer.getData("playerID"), Number(cell_id))
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
				<div className="cell-mod card">
					{`${cellData.mod.type} by ${cellData.mod.playerID}`}
				</div>
			}
		</div>
	);

}