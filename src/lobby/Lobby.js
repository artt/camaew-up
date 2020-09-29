import React from 'react'
import Entry from './Entry'
import Join from './Join'
import Create from './Create'
import Wait from './Wait'

export default function Lobby({startGame}) {

	const [name, setName] = React.useState("");
	const [lobbyState, setLobbyState] = React.useState("entry");
	const [gameID, setGameID] = React.useState("");
	const [numPlayers, setnumPlayers] = React.useState(4);
	const [numCats, setNumCats] = React.useState(5);

	let server = "https://camaew-up.herokuapp.com"
	if (process.env.NODE_ENV === "development")
		server = "http://localhost:8000"
	const [serverPath, setServerPath] = React.useState(server)

	// for development purpose
	// npm run host, and npm run client
	React.useEffect(() => {
		console.log(process.env.REACT_APP_AGENT)
		if (process.env.REACT_APP_AGENT === "host") {
			const data = {numPlayers: 2, setupData: {test: true, numCats: 5, numTiles: 16}}
			createGame(data).then(x => {
				console.log(x.gameID)
				fetch(serverPath + "/games/CamaewUp/" + x.gameID + "/join", {
					method: "post",
					headers: {"Content-Type": "application/json"},
					body: JSON.stringify({
						playerID: 0,
						playerName: 'Host'
					})
				})
					.then(response => response.json())
					.then(data => {
						startGame(serverPath, x.gameID, 0, data.playerCredentials)
					})
			})
		}
		else if (process.env.REACT_APP_AGENT === "client") {
			fetch(serverPath + "/games/CamaewUp/")
				.then(response => response.json())
				.then(data => {
					const gameID = data.rooms.pop().gameID
					fetch(serverPath + "/games/CamaewUp/" + gameID + "/join", {
						method: "post",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({
							playerID: 1,
							playerName: 'Client'
						})
					})
						.then(response => response.json())
						.then(data => {
							startGame(serverPath, gameID, 1, data.playerCredentials)
						})
				})
		}
	}, [])

	function onServerPathChange(event) {
		setServerPath(event.target.value);
	}

	function onNameChange(event) {
		setName(event.target.value);
	}

	function onGameIDChange(event) {
		setGameID(event.target.value)
	}

	function onNumPlayersChange(val) {
		setnumPlayers(val)
	}

	function onNumCatsChange(val) {
		setNumCats(val)
	}

	function onJoinClick() {
		setLobbyState("join")
	}

	function onCreateClick() {
		setLobbyState("create")
	}

	function onJoinJoinClick() {
		// console.log("Joining a game...", gameID)
		joinGame()
	}

	function onCreateCreateClick() {
		// console.log("Creating game...")
		const data = {numPlayers: numPlayers, setupData: {numCats: numCats, numTiles: 16}}
		createGame(data).then(x => {
			// console.log("Game created", x.gameID)
			setGameID(x.gameID)
			joinGame()
		})
	}

	/**
	 * Creates a game.
	 *
	 * @return     A promise to gameID.
	 */
	function createGame(data) {
		// const opts = {numPlayers: numPlayers, setupData: {}}
		// console.log("Creating game...")
		return fetch(serverPath + "/games/CamaewUp/create", {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify(data)
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
	function joinGame() {
		setLobbyState("wait")
	}

	function backToEntry() {
		setLobbyState("entry")
	}

	const data = {
		name: name,
		gameID: gameID,
		numPlayers: numPlayers,
		numCats: numCats,
		serverPath: serverPath,
		serverPathFull: serverPath + "/games/CamaewUp",
		onServerPathChange: onServerPathChange,
		onNameChange: onNameChange,
		onGameIDChange: onGameIDChange,
		onNumPlayersChange: onNumPlayersChange,
		onNumCatsChange: onNumCatsChange,
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
	else if (lobbyState === "wait") {
		// console.log("name", name)
		return(<Wait data={data} startGame={startGame} />)
	}

}
