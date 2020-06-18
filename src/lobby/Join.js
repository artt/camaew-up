import React from 'react'
import {Button, Form} from 'react-bootstrap'

// function Join({onJoinJoinClick, onGameIDChange, gameID}) {
function Join({data, onJoinJoinClick}) {

	return(
		<div className="lobby">
			<div>
				<Form.Label>Name</Form.Label>
				<Form.Control type="text" value={data.name} onChange={data.onNameChange} />
			</div>
			<div id="join-gameid">
				<Form.Label>Game ID</Form.Label>
				<Form.Control type="text" value={data.gameID} onChange={data.onGameIDChange} />
			</div>
			<div id="lobby-join" className="center">
				<Form.Label>Join Game</Form.Label>
				<Button variant="primary" onClick={onJoinJoinClick} disabled={!data.gameID || !data.name}>Join</Button>
				<Button variant="secondary" onClick={data.backToEntry}>Back</Button>
			</div>
		</div>
	);

}

export default Join;