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
			<div>
				<div>Join Game</div>
				<Button variant="primary" onClick={() => onJoinClick(name)} disabled={!name}>Join</Button>
			</div>
			<div>
				<div>Create Game</div>
				<Button variant="primary" onClick={() => onCreateClick(name)} disabled={!name}>Create</Button>
			</div>
		</div>
	)
}

export default Entry;