import React from 'react'
import {Button, Form, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'

function Wait({serverPath, name, gameID, autoSit}) {

	const [firstRun, setFirstRun] = React.useState(true)
	const [gameInfo, setGameInfo] = React.useState(null)
	const [playerID, setPlayerID] = React.useState(-1)
	const [playerCredentials, setPlayerCredentials] = React.useState("")

	React.useEffect(() => {
    const interval = setInterval(() => {
      updateGameInfo();
    }, 5000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  React.useEffect(() => {
  	if (gameInfo != null && firstRun && autoSit) {
  		console.log("Autositting...")
			console.log(gameInfo)
			sit()
			setPlayerID("0")
			console.log("Done sitting.")
			console.log(gameInfo)
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
				// console.log(data)
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

	function leave() {
		stand()
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
								{/*{!x.name ? (
									<div>–</div>
									// <Button variant="primary" onClick={() => sit(x.id)}>Sit</Button>	
								) : (
									<div>{x.name}</div>
								)}*/}
							</div>
						);
					})
				}
				</div>
				<div>
					<Button variant="primary" onClick={sit} disabled={playerID >= 0}>Sit</Button>
					<Button variant="primary" onClick={stand} disabled={playerID < 0}>Stand</Button>
				</div>
				<div>
					<Button variant="primary" onClick={leave}>Leave</Button>
				</div>
			</div>
		)
	}

}

export default Wait;