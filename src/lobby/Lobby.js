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
	useParams,
	useLocation,
	Redirect
} from "react-router-dom";

function Lobby({serverPath, startGame}) {

	let history = useHistory()
	
	const [lobbyName, setLobbyName] = React.useState("");
	const [lobbyGameID, setLobbyGameID] = React.useState("");
	const [lobbyState, setLobbyState] = React.useState("entry");

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
		joinGame(name, gameID)
	}

	function onCreateCreateClick(name, opts) {
		console.log("Creating game...")
		createGame(opts).then(x => {
			console.log("Game created", x.gameID)
			joinGame(name, x.gameID)
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
	function joinGame(name, gameID) {
		setLobbyName(name)
		setLobbyGameID(gameID)
		setLobbyState("wait")
		history.push("/game/" + gameID)
	}

	function backToEntry() {
		// setGameID("")
		setLobbyState("entry")
	}

	function JoinComponent() {
		const {id} = useParams()
		return(<Join defaultID={id} onJoinJoinClick={onJoinJoinClick} setLobbyName={setLobbyName} setLobbyGameID={setLobbyGameID} />)
	}

	function JoinComponent2() {
		const {id} = useParams()
		if (id) {
			return (<Redirect to={'/join/' + id} /> )
		}
		return(<Join onJoinJoinClick={onJoinJoinClick} setLobbyName={setLobbyName} setLobbyGameID={setLobbyGameID} />)
	}

	function WaitComponent() {
		const {id} = useParams()
		return(<Wait name={lobbyName} serverPath={serverPath} gameID={id} backToEntry={backToEntry} startGame={startGame} />)
	}

	console.log("------", lobbyName, lobbyGameID)

	if (lobbyState != "wait") {

		return(
			<Switch>
				
				<Route exact path="/">
					<Entry onJoinClick={onJoinClick} onCreateClick={onCreateClick} />
				</Route>
				<Route exact path="/join/:id?">
					<JoinComponent />
				</Route>
				<Route exact path="/create">
					<Create onCreateCreateClick={onCreateCreateClick} />
				</Route>
				<Route exact path="/game/:id">
					<JoinComponent2 />
				</Route>

			</Switch>
		)

	}
	else {

		return(
			<Switch>
				<Route exact path="/game/:id">
					<WaitComponent />
				</Route>
			</Switch>
		)

	}


}

export default Lobby;