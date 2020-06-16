import React from 'react'
import Entry from './Entry'
import Join from './Join'
import Create from './Create'
import Wait from './Wait'

const serverPath = "http://localhost:8000/games/CamaewUp"

function Lobby({serverPath}) {

	const [name, setName] = React.useState("");
	const [lobbyState, setLobbyState] = React.useState("entry");
	const [gameID, setGameID] = React.useState("");

	function onNameChange(event) {
		setName(event.target.value);
	}

	function onJoinClick() {
		setLobbyState("join")
	}

	function onCreateClick() {
		setLobbyState("create")
	}

	function onJoinJoinClick(gameID) {
		console.log("Joining a game...", gameID)
		joinGame(gameID, "wait-join")
	}

	function onCreateCreateClick(opts) {
		console.log("Creating game...")
		createGame(opts).then(x => {
			console.log("Game created", x.gameID)
			joinGame(x.gameID, "wait-create")
		})
	}

	/**
	 * Creates a game.
	 *
	 * @return     A promise to gameID.
	 */
	function createGame(opts) {
		// const opts = {numPlayers: numPlayers, setupData: {}}
		console.log("Creating game...")
		return fetch(serverPath + "/create", {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({numPlayers: opts.maxPlayers, setupData: {numCats: opts.numCats}})
		})
			.then(response => response.json())
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
	function joinGame(gameID, nextState) {
		// getGameInfo(gameID)
		// 	.then(gameInfo => {
		// 		console.log("Received game info", gameInfo)
		// 		setGameInfo(gameInfo)
		// 		setLobbyState("wait")
		// 	})
		setGameID(gameID)
		setLobbyState(nextState)
	}

	function backToEntry() {
		setGameID("")
		setLobbyState("entry")
	}

	const data = {
		name: name,
		onNameChange: onNameChange,
		backToEntry: backToEntry,
	}

	if (lobbyState === "entry") {
		return(<Entry data={data} onJoinClick={onJoinClick} onCreateClick={onCreateClick} />)
	}
	else if (lobbyState === "join") {
		return(<Join data={data} onJoinJoinClick={onJoinJoinClick} />)
	}
	else if (lobbyState === "create") {
		return(<Create data={data} onCreateCreateClick={onCreateCreateClick} />)
	}
	else if (lobbyState === "wait-create") {
		// console.log("xxx", gameInfo)
		console.log("name", name)
		return(<Wait data={data} serverPath={serverPath} gameID={gameID} autoSit={true} />)
	}
	else if (lobbyState === "wait-join") {
		// console.log("xxx", gameInfo)
		console.log("name", name)
		return(<Wait data={data} serverPath={serverPath} gameID={gameID} autoSit={false} />)
	}

}

export default Lobby;