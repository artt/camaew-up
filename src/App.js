import React, {useState, useEffect} from 'react'
import {Client} from 'boardgame.io/react'
import {SocketIO} from 'boardgame.io/multiplayer'
import CamaewUp from './CamaewUp'
import Lobby from './Lobby'
import GameScreen from './game/GameScreen'
import { createBrowserHistory } from 'history'

import './style.css'

const CamaewUpClient = Client({game: CamaewUp,
															 board: GameScreen,
															 numPlayers: 4,
															 multiplayer: SocketIO({server: "localhost:8000"})
														 })

const serverPath = "http://localhost:8000/games/CamaewUp"
const history = createBrowserHistory()

function App() {

	const [name, setName] = useState("");
	const [joinID, setJoinID] = useState("");
	const [state, setState] = useState({name: "lobby"});

	useEffect(() => {
		if (state.name === "game") {
			history.push('?' + state.gameID)
		}
	}, [state.name])

	function onNameChange(event) {
		setName(event.target.value);
	}

	function onJoinChange(event) {
		setJoinID(event.target.value);
	}

	function onJoinClick() {
		joinGame(joinID)
		// setState({name: "game"})
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

	function onCreateClick() {
		createGame().then(x => {
			console.log("Game created", x.gameID)
			joinGame(x.gameID)
		})
	}

	if (state.name === "lobby") {
		return(
			<div>
				<Lobby
					onNameChange={onNameChange}
					onJoinChange={onJoinChange}
					onJoinClick={onJoinClick}
					onCreateClick={onCreateClick} />
			</div>
		)
	}
	else if (state.name === "game") {
		return(
			<div>
				<CamaewUpClient playerID="0" gameID={joinID}/>
			</div>
		);
	}

}

export default App;
