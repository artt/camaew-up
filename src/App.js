import React, {useState, useEffect} from 'react'
import {Client} from 'boardgame.io/react'
import {SocketIO} from 'boardgame.io/multiplayer'
import CamaewUp from './CamaewUp'
import Lobby from './lobby/Lobby'
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

	const [state, setState] = useState({name: "lobby"});

	useEffect(() => {
		if (state.name === "game") {
			history.push('?' + state.gameID)
		}
	}, [state.name])

	if (state.name === "lobby") {
		return(
			<div>
				<Lobby />
			</div>
		)
	}
	else if (state.name === "game") {
		return(
			<div>
				<CamaewUpClient playerID="0" gameID="0"/>
			</div>
		);
	}

}

export default App;
