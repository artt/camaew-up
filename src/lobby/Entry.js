import React from 'react'
import {Button, Form} from 'react-bootstrap'

function Entry({onJoinClick, onCreateClick}) {

	const [name, setName] = React.useState("");

	function onNameChange(event) {
		setName(event.target.value)
	}

	return(
		<div id="entry-container" className="lobby">
			<div id="entry-name">
				<Form.Label>Name</Form.Label>
				<Form.Control type="text" onChange={onNameChange} />
			</div>
			<div className="center">
				<div>Join Game</div>
				<Button variant="primary" onClick={onJoinClick} disabled={!name}>Join</Button>
			</div>
			<div className="center">
				<div>Create Game</div>
				<Button variant="primary" onClick={onCreateClick} disabled={!name}>Create</Button>
			</div>
		</div>
	)
}

export default Entry;