import React from 'react'
import Cell from './Cell'
import {Button, Modal} from 'react-bootstrap'

export default function RaceTrack({board, placeMod, removeMod}) {

	const [showModDialog, setShowModDialog] = React.useState(false)
	const [playerID, setPlayerID] = React.useState(null)
	const [cellID, setCellID] = React.useState(null)
	
	function prePlaceMod(playerID, cellID) {
		setPlayerID(playerID)
		setCellID(cellID)
		setShowModDialog(true)
	}

	return(
		<React.Fragment>

			<div className="board">
				{
					board.map((cell, i) => <Cell cellData={cell} key={i} cell_id={i} prePlaceMod={prePlaceMod} />)
				}
			</div>

			<Modal show={showModDialog} onHide={() => setShowModDialog(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Placing Mod</Modal.Title>
				</Modal.Header>
				<Modal.Body>Which kind of mod would you like to place?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModDialog(false)}>
						Close
					</Button>
					<Button variant="outline-primary" onClick={() => {
							console.log("Remove mod")
							removeMod(playerID, cellID)
							setShowModDialog(false)
						}}>
						Tape
					</Button>
					<Button variant="danger" onClick={() => {
							console.log("Place tape mod")
							placeMod(playerID, cellID, "tape")
							setShowModDialog(false)
						}}>
						Tape
					</Button>
					<Button variant="success" onClick={() => {
							console.log("Place cucumber mod")
							placeMod(playerID, cellID, "cucumber")
							setShowModDialog(false)
						}}>
						Cucumber
					</Button>
				</Modal.Footer>
			</Modal>

		</React.Fragment>
	)

}
