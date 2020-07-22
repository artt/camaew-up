import React from 'react'
import {Button, Modal} from 'react-bootstrap'

function Wait({data, serverPath, startGame}) {

	const [gameInfo, setGameInfo] = React.useState(null)
	const [numPlayers, setNumPlayers] = React.useState(0)
	const [playerID, setPlayerID] = React.useState(-1)
	const [playerCredentials, setPlayerCredentials] = React.useState("")
	const [showConfirmLeave, setShowConfirmLeave] = React.useState(false)

	// no idea why we need to use useCallback() :P
	
	const updateGameInfo = React.useCallback(() => {
		console.log("Getting game info...", data.gameID)
		fetch(serverPath + "/" + data.gameID, {
			method: "get"
		})
			.then(response => response.json())
			.then(data => setGameInfo(data))
	}, [data.gameID, serverPath])

	const findSeat = React.useCallback(() => {
		updateGameInfo()
		for (let id=0; id < gameInfo.players.length; id ++) {
			if (gameInfo.players[id].name == null) {
				return id
			}
		}
	}, [gameInfo, updateGameInfo])

	const sit = React.useCallback(() => {
		console.log("Sitting...", gameInfo)
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
	}, [data.name, findSeat, gameInfo, serverPath, updateGameInfo])

	React.useEffect(() => {
		const interval = setInterval(() => {
			updateGameInfo();
		}, 2000);
		return () => {
			clearInterval(interval);
		};
	});

	React.useEffect(() => {
		if (gameInfo != null) {
			setNumPlayers(() => {
				let count = 0
				for (let id=0; id < gameInfo.players.length; id ++) {
					if (gameInfo.players[id].name != null) {
						count ++
					}
				}
				return count
			})
		}
	}, [gameInfo, playerCredentials, playerID, sit])

	function stand(updateAfter=true) {
		const opts = {
				playerID: playerID,
				credentials: playerCredentials
			} 
		fetch(serverPath + "/" + gameInfo.roomID + "/leave", {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(opts)
		})
			.then(() => {
				if (updateAfter) updateGameInfo()
			})
		setPlayerID(-1)
	}

	function onLeaveClick() {
		console.log("Leaving...")
		setShowConfirmLeave(true)		
	}

	function leave() {
		stand(false)
		data.backToEntry()
	}

	function dialog(text, showState, setShowState) {
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
					gameInfo.players.map((x, i) => {
						return(
							<div key={i}>
								{x.id} - {x.name}
							</div>
						);
					})
				}
				</div>
				<div>
					<Button variant="secondary" onClick={sit} disabled={playerID >= 0}>Sit</Button>
					<Button variant="secondary" onClick={stand} disabled={playerID < 0 || numPlayers === 1}>Stand</Button>
					<Button variant="secondary" onClick={onLeaveClick}>Leave</Button>
					<Button variant="primary" onClick={() => startGame(data.gameID, playerID, playerCredentials)} disabled={numPlayers < gameInfo.players.length}>Start</Button>
				</div>

				{/* Confirm leave dialog */}

				{dialog({
						header: "Leaving",
						body: "Are you sure you'd like to leave?",
						confirm: "Leave"
					},
					showConfirmLeave, setShowConfirmLeave)}

			</div>

		)
	}

}

export default Wait;