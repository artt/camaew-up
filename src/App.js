import React, {useState, useEffect} from 'react'
import {Client} from 'boardgame.io/react'
import {SocketIO} from 'boardgame.io/multiplayer'
import CamaewUp from './CamaewUp'
import Lobby from './lobby/Lobby'
import GameScreen2 from './game/GameScreen'
import { createBrowserHistory } from 'history'
import ReactGA from 'react-ga'
import { EffectsBoardWrapper } from 'bgio-effects/react';

import './style.css'

let CamaewUpClient = null

const history = createBrowserHistory()

ReactGA.initialize('UA-2995735-5')
ReactGA.pageview(window.location.pathname + window.location.search)

function App() {

	const [state, setState] = useState("lobby");
	const [data, setData] = useState({})

	function startGame(serverPath, gameID, playerID, credentials) {
		setData({gameID: gameID, playerID: playerID, credentials: credentials})
		const board = EffectsBoardWrapper(GameScreen2, {
		  // Delay passing the updated boardgame.io state to your board
		  // until after the last effect has been triggered.
		  // Default: false
		  updateStateAfterEffects: true});
		CamaewUpClient = Client({game: CamaewUp,
																board: board,
																multiplayer: SocketIO({server: serverPath}),
																debug: false
															})
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
				<Lobby startGame={startGame}/>
			</div>
		)
	}
	else if (state === "game") {
		return(
			<div>
				<CamaewUpClient gameID={data.gameID}
												playerID={String(data.playerID)}
												credentials={data.credentials} />
			</div>
		);
	}

}

export default App;
