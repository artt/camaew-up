import React, {useState, useEffect} from 'react'
import {Client} from 'boardgame.io/react'
import {SocketIO} from 'boardgame.io/multiplayer'
import {CamaewUp} from './CamaewUp'
<<<<<<< HEAD
import Lobby from './Lobby'
import GameScreen from './game/GameScreen'

import './style.css'

const CamaewUpClient = Client({game: CamaewUp,
															 board: GameScreen,
=======
import Table from './Table'
import Main from './Main'

const CamaewUpClient = Client({game: CamaewUp,
															 board: Main,
>>>>>>> 4749003d198ebdfbb473fab8e5bb7b7c3775644b
															 numPlayers: 4,
															 multiplayer: SocketIO({server: "localhost:8000"})
														 })

function App() {

	const [joinID, setJoinID] = useState('');
<<<<<<< HEAD
	const [state, setState] = useState('lobby');
=======
	const [state, setState] = useState('table');
>>>>>>> 4749003d198ebdfbb473fab8e5bb7b7c3775644b

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

<<<<<<< HEAD
	if (state === "lobby") {
		return(
			<div>
				<Lobby onJoinChange={onJoinChange} onJoinClick={onJoinClick} onCreateClick={onCreateClick} />
=======
	if (state === "table") {
		return(
			<div>
				<Table onJoinChange={onJoinChange} onJoinClick={onJoinClick} onCreateClick={onCreateClick} />
>>>>>>> 4749003d198ebdfbb473fab8e5bb7b7c3775644b
			</div>
		)
	}
	else if (state === "game") {
		return(
			<div>
<<<<<<< HEAD
				<CamaewUpClient playerID="2" gameID={joinID}/>
=======
				<CamaewUpClient playerID="0" gameID={joinID}/>
>>>>>>> 4749003d198ebdfbb473fab8e5bb7b7c3775644b
			</div>
		);
	}

}

export default App;
