import React from 'react'
import {Button, Form, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'

function Wait({serverPath, name, gameID}) {

	const [gameInfo, setGameInfo] = React.useState(null)
	const [playerID, setPlayerID] = React.useState("")
	const [playerCredentials, setPlayerCredentials] = React.useState("")

	function getGameInfo(gameID) {
		console.log("Getting game info...", gameID)
		return fetch(serverPath + "/" + gameID, {
			method: "get"
		})
			.then(response => response.json())
	}

	function sit(seatID) {
		console.log("Sitting...", seatID)
		if (playerID) {
			// already have a seat, so change seat
			stand()
		}
		// sit down	
		const opts = {
			playerID: seatID,
			playerName: name
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
		setPlayerID("")
	}

	function leave() {

	}

	if (gameInfo == null) {
		getGameInfo(gameID).then(data => setGameInfo(data))
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
								{!x.name ? (
									<Button variant="primary" onClick={() => sit(x.id)}>Sit</Button>	
								) : (
									<div>xx</div>
								)}
							</div>
						);
					})
				}
				</div>
				<div>
					{playerCredentials ? (
						<Button variant="primary" onClick={stand}>Stand up</Button>
					) : (
						<div>xx</div>
					)}
				</div>
				<div>
					<Button variant="primary" onClick={leave}>Leave</Button>
				</div>
			</div>
		)
	}

}

export default Wait;