import React from 'react'
import Entry from './Entry'
import Join from './Join'
import Create from './Create'
import Wait from './Wait'
import { useHistory } from 'react-router-dom'
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useRouteMatch,
	useParams
} from "react-router-dom";

function Lobby({serverPath, startGame}) {

	const [name, setName] = React.useState("");
	const [lobbyState, setLobbyState] = React.useState("entry");
	const [gameID, setGameID] = React.useState("");

	let history = useHistory()

	function onJoinClick() {
		setLobbyState("join")
		history.push("/join")
	}

	function onCreateClick() {
		setLobbyState("create")
		history.push("/create")
	}

	function onJoinJoinClick(name, gameID) {
		console.log("Joining a game...", gameID)
		setName(name)
		joinGame(gameID, "wait-join")
		history.push("/game/" + gameID)
	}

	function onCreateCreateClick(name, opts) {
		console.log("Creating game...")
		setName(name)
		createGame(opts).then(x => {
			console.log("Game created", x.gameID)
			joinGame(x.gameID, "wait-create")
			history.push("/game/" + x.gameID)
		})
	}

	/**
	 * Creates a game.
	 *
	 * @return     A promise to gameID.
	 */
	function createGame(opts) {
		console.log("Creating game...")
		return fetch(serverPath + "/create", {
			method: "post",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({numPlayers: opts.numPlayers, setupData: {numCats: opts.numCats}})
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
		setGameID(gameID)
		setLobbyState(nextState)
	}

	function backToEntry() {
		setGameID("")
		setLobbyState("entry")
	}

	function WaitComponent() {
		const {gameID} = useParams()
		if (lobbyState === "entry") {
			history.push("/join/" + gameID)
			// xxxxxxxxxx
			// return(<Join onJoinJoinClick={onJoinJoinClick} potentialGameID={gameID} />)
		}
		else {
			return(<Wait name={name} serverPath={serverPath} gameID={gameID} backToEntry={backToEntry} startGame={startGame} />)
		}
	}

	return(
		<Switch>
			
			<Route exact path="/">
				<Entry onJoinClick={onJoinClick} onCreateClick={onCreateClick} />
			</Route>
			<Route exact path="/join">
				<Join onJoinJoinClick={onJoinJoinClick} />
			</Route>
			<Route exact path="/create">
				<Create onCreateCreateClick={onCreateCreateClick} />
			</Route>
			<Route path="/:mode/:gameID">
				<WaitComponent />
			</Route>

		</Switch>
	)

}

export default Lobby;