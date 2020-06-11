import React, {useState, useEffect} from 'react'
import {Client} from 'boardgame.io/react'
import {SocketIO} from 'boardgame.io/multiplayer'
import {CamaewUp} from './CamaewUp'
import Lobby from './Lobby'
import GameScreen from './game/GameScreen'

import './style.css'

const CamaewUpClient = Client({game: CamaewUp,
															 board: GameScreen,
															 numPlayers: 4,
															 multiplayer: SocketIO({server: "localhost:8000"})
														 })

function App() {

	const [joinID, setJoinID] = useState('');
	const [state, setState] = useState('lobby');

	function onJoinChange(event) {
		setJoinID(event.target.value);
	}

	function onJoinClick() {
		setState("game")
	}

	function onCreateClick() {
		setJoinID(String(Math.floor(Math.random()*90000) + 10000))
		setState("game")
	}

	if (state === "lobby") {
		return(
			<div>
				<Lobby onJoinChange={onJoinChange} onJoinClick={onJoinClick} onCreateClick={onCreateClick} />
			</div>
		)
	}
	else if (state === "game") {
		return(
			<div>
				<CamaewUpClient playerID="2" gameID={joinID}/>
			</div>
		);
	}

}

export default App;
