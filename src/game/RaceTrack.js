import React from 'react'
import Cell from './Cell'
import {Button, Modal} from 'react-bootstrap'

export default function RaceTrack({G, playerID, gameMetadata, placeMod, moveMod, removeMod, flipMod}) {

	const [showPlaceDialog, setShowPlaceDialog] = React.useState(false)
	const [showFlipDialog, setShowFlipDialog] = React.useState(false)
	const [cellID, setCellID] = React.useState(null)
	const [oldCellID, setOldCellID] = React.useState(null)
	const [type, setType] = React.useState(null)
	
	function prePlaceMod(cellID, type, oldCellID) {
		if (oldCellID === null && !G.players[playerID].hasMod) {
			console.error("Player has already placed his/her mod.")
			return
		}
		if (G.board[cellID].stack.length > 0) {
			console.error("Cannot place mod where cats are.")
			return
		}
		if ((cellID > 0 && G.board[cellID-1].mod !== null && G.board[cellID-1].mod.playerID !== playerID)
				|| (cellID < G.board.length - 1 && G.board[cellID+1].mod !== null && G.board[cellID+1].mod !== playerID)) {
			console.error("Cannot place mod adjacent to an existing mod.")
			return
		}
		if (G.board[cellID].mod !== null) {
			if (G.board[cellID].mod.playerID === playerID)
				return
			console.error("Cannot place mod on top of an existing mod.")
			return
		}
		setCellID(cellID)
		setType(type)
		setOldCellID(oldCellID)
		setShowPlaceDialog(true)
	}

	function preFlipMod(cellID) {
		setCellID(cellID)
		setShowFlipDialog(true)
	}

	function PlaceDialog() {
		return (
			<Modal show={showPlaceDialog} onHide={() => setShowPlaceDialog(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Placing Mod</Modal.Title>
				</Modal.Header>
				<Modal.Body>Which kind of mod would you like to place?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowPlaceDialog(false)}>
						Cancel
					</Button>
					<Button variant="danger" onClick={() => {
							console.log("Place tape mod")
							if (type === "place")
								placeMod(playerID, cellID, "tape")
							else if (type === "move")
								moveMod(playerID, oldCellID, cellID, "tape")
							setShowPlaceDialog(false)
						}}>
						Tape
					</Button>
					<Button variant="success" onClick={() => {
							console.log("Place cucumber mod")
							if (type === "place")
								placeMod(playerID, cellID, "cucumber")
							else if (type === "move")
								moveMod(playerID, oldCellID, cellID, "cucumber")
							setShowPlaceDialog(false)
						}}>
						Cucumber
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}

	function FlipDialog() {
		return (
			<Modal show={showFlipDialog} onHide={() => setShowFlipDialog(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Flipping Mod</Modal.Title>
				</Modal.Header>
				<Modal.Body>Would you like to flip the mod?</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowFlipDialog(false)}>
						Cancel
					</Button>
					<Button variant="outline-primary" onClick={() => {
							console.log("Remove mod")
							removeMod(playerID, cellID)
							setShowFlipDialog(false)
						}}>
						Remove
					</Button>
					<Button variant="primary" onClick={() => {
							console.log("Flip mod")
							flipMod(playerID, cellID)
							setShowFlipDialog(false)
						}}>
						Flip
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}

	return(
		<React.Fragment>

			<div className="board">
				{
					G.board.map((cell, i) => <Cell
																			cellData={cell}
																			key={i}
																			cell_id={i}
																			playerID={playerID}
																			gameMetadata={gameMetadata}
																			prePlaceMod={prePlaceMod}
																			preFlipMod={preFlipMod}
																		/>)
				}
			</div>

			<PlaceDialog />
			<FlipDialog />

		</React.Fragment>
	)

}
