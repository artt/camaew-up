import React from 'react'
import {Button, Form, ToggleButtonGroup, ToggleButton, Modal} from 'react-bootstrap'

function Wait({data, serverPath, gameID, autoSit}) {

	const [firstRun, setFirstRun] = React.useState(true)
	const [gameInfo, setGameInfo] = React.useState(null)
	const [numPlayers, setNumPlayers] = React.useState(0)
	const [playerID, setPlayerID] = React.useState(-1)
	const [playerCredentials, setPlayerCredentials] = React.useState("")
	const [showConfirmLeave, setShowConfirmLeave] = React.useState(false)

	function countPlayers() {
		if (gameInfo != null) {
			let count = 0
			for (let id=0; id < gameInfo.players.length; id ++) {
				if (gameInfo.players[id].name != null) {
					count ++
				}
			}
			return count
		}
		return null
	}

	React.useEffect(() => {
		const interval = setInterval(() => {
			updateGameInfo();
			setNumPlayers(countPlayers())
		}, 5000);
		return () => {
			clearInterval(interval);
		};
	}, []);

	React.useEffect(() => {
		if (gameInfo != null && firstRun && autoSit) {
			sit()
			setPlayerID("0")
			setFirstRun(false)
		}
		else {
			console.log(gameInfo)
			console.log(playerID)
			console.log(playerCredentials)
			console.log(firstRun)
		}
	}, [gameInfo])

	function updateGameInfo() {
		getGameInfo(gameID)
			.then(data => {
				setGameInfo(data)
			})
	}

	function getGameInfo() {
		console.log("Getting game info...", gameID)
		return fetch(serverPath + "/" + gameID, {
			method: "get"
		})
			.then(response => response.json())
	}

	function findSeat() {
		updateGameInfo()
		for (let id=0; id < gameInfo.players.length; id ++) {
			if (gameInfo.players[id].name == null) {
				return id
			}
		}
	}

	function sit() {
		console.log("Sitting...")
		// TODO: deal with long waits
		const seatID = findSeat()
		console.log("Found empty seat", seatID)
		const opts = {
			playerID: seatID,
			playerName: data.name
		}
		fetch(serverPath + "/" + gameInfo.roomID + "/join", {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(opts)
		})
			.then(response => response.json())
			.then(data => {
				setPlayerCredentials(data.playerCredentials)
				setPlayerID(seatID)
				updateGameInfo()
			})
	}

	function stand() {
		const opts = {
				playerID: playerID,
				credentials: playerCredentials
			} 
		fetch(serverPath + "/" + gameInfo.roomID + "/leave", {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(opts)
		})
			.then(() => updateGameInfo())
		setPlayerID(-1)
	}

	function onLeaveClick() {
		console.log("Leaving...")
		setShowConfirmLeave(true)		
	}

	function leave() {
		stand()
		data.backToEntry()
	}

	function onConfirmLeaveClose() {
		setShowConfirmLeave(false)
	}

	function onConfirmLeaveConfirm() {
		setShowConfirmLeave(false)
	}

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

	if (gameInfo == null) {
		updateGameInfo()
		return(<div>Connecting...</div>)
	}
	else {
		return(
			<div className="lobby">
				<div>
					gameID: {gameInfo.roomID}
				</div>
				<div>
				{
					gameInfo.players.map(x => {
						return(
							<div>
								{x.id} - {x.name}
							</div>
						);
					})
				}
				</div>
				<div>
					<Button variant="primary" onClick={sit} disabled={playerID >= 0}>Sit</Button>
					<Button variant="primary" onClick={stand} disabled={playerID < 0 || countPlayers() === 1}>Stand</Button>
					<Button variant="primary" onClick={onLeaveClick}>Leave</Button>
				</div>

				{/* Confirm leave dialog */}

				{dialog({
						header: "Leaving",
						body: "Are you sure you'd like to leave?",
						confirm: "Leave"
					},
					showConfirmLeave, setShowConfirmLeave, setShowConfirmLeave)}

			</div>

		)
	}

}

export default Wait;