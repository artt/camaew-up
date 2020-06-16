import React from 'react'
import {Button, Form} from 'react-bootstrap'

// function Join({onJoinJoinClick, onGameIDChange, gameID}) {
function Join({data, onJoinJoinClick}) {

	const [gameID, setGameID] = React.useState("");

	function onGameIDChange(event) {
		setGameID(event.target.value)
	}

	return(
		<div className="lobby">
			<div id="join-gameid">
				<Form.Label>Game ID</Form.Label>
				<Form.Control type="text" onChange={onGameIDChange} />
			</div>
			<div id="lobby-join" className="center">
				<Form.Label>Join Game</Form.Label>
				<Button variant="primary" onClick={() => onJoinJoinClick(gameID)} disabled={!gameID}>Join</Button>
			</div>
		</div>
	);

}

export default Join;