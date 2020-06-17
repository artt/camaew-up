import React from 'react'
import {Button, Form} from 'react-bootstrap'
import { useHistory } from 'react-router-dom'

// function Join({onJoinJoinClick, onGameIDChange, gameID}) {
function Join({onJoinJoinClick, potentialGameID}) {

	const [name, setName] = React.useState("");
	const [gameID, setGameID] = React.useState("");

	const history = useHistory()

	function onNameChange(event) {
		setName(event.target.value);
	}

	function onGameIDChange(event) {
		setGameID(event.target.value)
	}

	React.useEffect(() => {
		if (potentialGameID != undefined) {
			setGameID(potentialGameID)
		}
	}, [])

	return(
		<div className="lobby">
			<div>
				<Form.Label>Name</Form.Label>
				<Form.Control type="text" value={name} onChange={onNameChange} />
			</div>
			<div id="join-gameid">
				<Form.Label>Game ID</Form.Label>
				<Form.Control type="text" onChange={onGameIDChange} defaultValue={potentialGameID} />
			</div>
			<div id="lobby-join" className="center">
				<Form.Label>Join Game</Form.Label>
				<Button variant="primary" onClick={() => onJoinJoinClick(name, gameID)} disabled={!gameID || !name}>Join</Button>
				<Button variant="secondary" onClick={history.goBack}>Back</Button>
			</div>
		</div>
	);

}

export default Join;