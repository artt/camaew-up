import React from 'react'
import Cell from './Cell'
import {Button, Modal} from 'react-bootstrap'
import styles from './_Game.scss'

export default function RaceTrack({G, playerID, gameMetadata, placeMod, moveMod, removeMod, flipMod}) {

	const [showPlaceDialog, setShowPlaceDialog] = React.useState(false)
	const [showFlipDialog, setShowFlipDialog] = React.useState(false)
	const [cellID, setCellID] = React.useState(null)
	const [type, setType] = React.useState(null)

	const [cats, setCats] = React.useState(G.cats)
	
	function prePlaceMod(cellID, type) {
		if (type === "place" && G.players[playerID].modPos > -1) {
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
							// console.log("Place tape mod")
							if (type === "place")
								placeMod(playerID, cellID, "tape")
							else if (type === "move")
								moveMod(playerID, cellID, "tape")
							setShowPlaceDialog(false)
						}}>
						Tape
					</Button>
					<Button variant="success" onClick={() => {
							// console.log("Place cucumber mod")
							if (type === "place")
								placeMod(playerID, cellID, "cucumber")
							else if (type === "move")
								moveMod(playerID, cellID, "cucumber")
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
							// console.log("Remove mod")
							removeMod(playerID)
							setShowFlipDialog(false)
						}}>
						Remove
					</Button>
					<Button variant="primary" onClick={() => {
							// console.log("Flip mod")
							flipMod(playerID)
							setShowFlipDialog(false)
						}}>
						Flip
					</Button>
				</Modal.Footer>
			</Modal>
		)
	}

	const catEmoji = ['(ꏿ ᆺ ꏿ)', '(=^ ◡ ^=)', '(=✪ᆽ✪=)', '(=චᆽච=)', '(≗ᆽ≗)', '( ̿–ᆺ ̿–)']

	function getSize(name) {
		return Number(styles[name].substring(0, styles[name].length - 2))
	}

	// getCSSSize('cellwidth')
	const sz = {
		cell: {
			width: getSize('cellwidth'),
			height: getSize('cellheight'),
			margin: getSize('cellmargin'),
		},
		token: {
			width: getSize('tokenwidth'),
			height: getSize('tokenheight'),
			margin: getSize('tokenmargin'),
		}
	}

	function getCatPos(pos) {
		return {left: `${pos[0]*(sz.cell.width + 2*sz.cell.margin) + sz.cell.margin + (sz.cell.width - sz.token.width)/2}px`,
						top: `${sz.cell.height + sz.cell.margin - (pos[1] + 1) * (sz.token.height + sz.token.margin)}px`}
	}

	return(
		<React.Fragment>

			<div className="board">
				{
					G.board.map((cell, i) => <Cell
																			cellData={cell}
																			key={i}
																			cell_id={i}
																			isExtra={i >= G.numTiles}
																			playerID={playerID}
																			gameMetadata={gameMetadata}
																			prePlaceMod={prePlaceMod}
																			preFlipMod={preFlipMod}
																		/>)
				}
				{
					G.cats.map((x, i) => {
						return(
							<div className={`cat tokencolor-${i}`}
									id={`cattoken-${i}`}
									key={"cat_stack_tmp" + i}
									style={getCatPos(x)}>
								{catEmoji[i]}<br />
							</div>
						)
					})
				}
			</div>

			<PlaceDialog />
			<FlipDialog />

		</React.Fragment>
	)

}
