import React from 'react'
import Entry from './Entry'
import Join from './Join'
import Create from './Create'
import Wait from './Wait'

const serverPath = "http://localhost:8000/games/CamaewUp"

function Lobby({serverPath}) {

	const [name, setName] = React.useState("");
	const [lobbyState, setLobbyState] = React.useState("lobby");
	const [gameID, setGameID] = React.useState("");
	// const [gameInfo, setGameInfo] = React.useState({});

	function onNameChange(event) {
		setName(event.target.value);
	}

	function onJoinClick(name) {
		setName(name)
		setLobbyState("join")
	}

	function onCreateClick(name) {
		setName(name)
		setLobbyState("create")
	}

	function onJoinJoinClick(gameID) {
		console.log("Joining a game...", gameID)
		joinGame(gameID)
	}

	function onCreateCreateClick() {
		console.log("Creating game...")
		createGame().then(x => {
			console.log("Game created", x.gameID)
			joinGame(x.gameID)
		})
	}

	/**
	 * Creates a game.
	 *
	 * @return     A promise to gameID.
	 */
	function createGame() {
		// const opts = {numPlayers: numPlayers, setupData: {}}
		console.log("Creating game...")
		// return fetch(serverPath + "/create", {
		// 	method: "post",
		// 	headers: {"Content-Type": "application/json"},
		// 	body: JSON.stringify(opts)
		// })
		// 	.then(response => response.json())
	}

	/**
	 * Enters a game with a given gameID.
	 * Note that this doesn't actually "join" the game
	 * (i.e. pick a seat, get credentials, etc.), but
	 * just enter into the room and display the information
	 * (see who's there, which seats are available, etc.)
	 *
	 * @param      {string}  gameID  The game ID.
	 */
	function joinGame(gameID) {
		// getGameInfo(gameID)
		// 	.then(gameInfo => {
		// 		console.log("Received game info", gameInfo)
		// 		setGameInfo(gameInfo)
		// 		setLobbyState("wait")
		// 	})
		setGameID(gameID)
		setLobbyState("wait")
	}

	// function getGameInfo(gameID) {
	// 	console.log("Getting game info...")
	// 	return fetch(serverPath + "/" + gameID, {
	// 		method: "get"
	// 	})
	// 		.then(response => response.json())
	// }

	if (lobbyState === "lobby") {
		return(<Entry onJoinClick={onJoinClick} onCreateClick={onCreateClick} />)
	}
	else if (lobbyState === "join") {
		return(<Join onJoinJoinClick={onJoinJoinClick} />)
	}
	else if (lobbyState === "create") {
		return(<Create serverPath={serverPath} name={name} onCreateCreateClick={onCreateCreateClick} />)
	}
	else if (lobbyState === "wait") {
		// console.log("xxx", gameInfo)
		console.log("name", name)
		return(<Wait serverPath={serverPath} name={name} gameID={gameID} />)
	}

}

export default Lobby;