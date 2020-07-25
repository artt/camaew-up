import React, {useState, useEffect} from 'react'
import {Client} from 'boardgame.io/react'
import {SocketIO} from 'boardgame.io/multiplayer'
import CamaewUp from './CamaewUp'
import Lobby from './lobby/Lobby'
import GameScreen from './game/GameScreen'
import { createBrowserHistory } from 'history'

import './style.css'

const socket = "https://c91fdc5aa037.ngrok.io"

const CamaewUpClient = Client({game: CamaewUp,
															 board: GameScreen,
															 multiplayer: SocketIO({server: socket}),
															 debug: false
														 })

const serverPath = socket + "/games/CamaewUp"
const history = createBrowserHistory()

function App() {

	const [state, setState] = useState("lobby");
	const [data, setData] = useState({})

	function startGame(gameID, playerID, credentials) {
		setData({gameID: gameID, playerID: playerID, credentials: credentials})
		setState("game")
	}

	useEffect(() => {
		if (state.name === "game") {
			history.push('?' + state.gameID)
		}
	}, [state.name, state.gameID])

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
