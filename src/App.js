import React, {useState, useEffect} from 'react'
import {Client} from 'boardgame.io/react'
import {SocketIO} from 'boardgame.io/multiplayer'
import CamaewUp from './CamaewUp'
import Lobby from './lobby/Lobby'
import GameScreen from './game/GameScreen'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

import './style.css'

const CamaewUpClient = Client({game: CamaewUp,
															 board: GameScreen,
															 multiplayer: SocketIO({server: "localhost:8000"})
														 })

const serverPath = "http://localhost:8000/games/CamaewUp"

function App() {

	const [state, setState] = useState("lobby");
	const [data, setData] = useState({})

	function startGame(gameID, playerID, credentials) {
		setData({gameID: gameID, playerID: playerID, credentials: credentials})
		setState("game")
	}

	useEffect(() => {
		if (state.name === "game") {
			// history.push('?' + state.gameID)
		}
	}, [state.name, state.gameID])

	let match = useRouteMatch("/:id")
	console.log(match)

	if (state === "lobby") {
		return(
			<div>
				<Lobby serverPath={serverPath} startGame={startGame}/>
			</div>
		)
	}
	else if (state === "game") {
		return(
			<div>
				<CamaewUpClient gameID={data.gameID} playerID={String(data.playerID)} credentials={data.credentials} />
			</div>
		);
	}

}

export default App;
