import React from 'react';

export default function Cell({cellData}) {

	function dialog(text, showState, setShowState, onConfirm) {
		// defaults
		if (text.confirm === undefined) text.confirm = "Confirm"
		return(
			<Modal show={showState} onHide={() => setShowState(false)}>
				{text.header && 
					<Modal.Header closeButton>
						<Modal.Title>{text.header}</Modal.Title>
					</Modal.Header>
				}
				<Modal.Body>{text.body}</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowState(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={() => {
							leave()
							setShowState(false)
						}}>
						{text.confirm}
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}

	function allowDrop(e) {
	  e.preventDefault();
	}

	function drop(e) {
		e.preventDefault();
		console.log("dropped", e.dataTransfer.getData("betID"))
		// makeBigBet(playerID, Number(e.dataTransfer.getData("betID")), side)
	}

	return (
		<div className="cell" onDragOver={allowDrop} onDrop={drop}>
			<div className="cell-content">
			{
				cellData.stack.slice(0).reverse().map((x) => {
					return(<div className={`token tokencolor-${x+1}`}>{x}<br /></div>)
				})
			}
			</div>
		</div>
	);

}