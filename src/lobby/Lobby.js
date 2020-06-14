import React from 'react'
import Entry from './Entry'
import Join from './Join'
import Create from './Create'

const serverPath = "http://localhost:8000/games/CamaewUp"

function Lobby() {

	const [name, setName] = React.useState("");
	const [lobbyState, setLobbyState] = React.useState("lobby")

	function onNameChange(event) {
		setName(event.target.value);
	}

	function onJoinClick() {
		setLobbyState("join")
	}

	function onCreateClick() {
		setLobbyState("create")
		// createGame().then(x => {
		// 	console.log("Game created", x.gameID)
		// 	joinGame(x.gameID)
		// })
	}

	function onJoinJoinClick() {
		console.log("joinjoin")
	}

	function onCreateCreateClick() {
		console.log("createcreate")
	}

	function createGame() {
		const opts = {numPlayers: 4, setupData: {}}
		console.log("Creating game...")
		return fetch(serverPath + "/create", {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(opts)
		})
			.then(response => response.json())
	}

	function getGameInfo(gameID) {
		console.log("Getting game info...")
		return fetch(serverPath + "/" + gameID, {
			method: "get"
		})
			.then(response => response.json())
	}

	function joinGame(gameID) {
		getGameInfo(gameID)
			.then(gameInfo => {
				console.log("Received game info", gameInfo)
				const opts = {
					playerID: "0",
					playerName: "abc",
					data: {}
				}
				console.log("Joining game...")
				fetch(serverPath + "/" + gameID + "/join", {
					method: "post",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify(opts)
				}).then(response => console.log(response))
			})
	}



	if (lobbyState === "lobby") {
		return(<Entry onJoinClick={onJoinClick} onCreateClick={onCreateClick} />)
	}
	else if (lobbyState === "join") {
		return(<Join onJoinJoinClick={onJoinJoinClick} />)
	}
	else if (lobbyState === "create") {
		return(<Create onCreateCreateClick={onCreateCreateClick} />)
	}

}

export default Lobby;