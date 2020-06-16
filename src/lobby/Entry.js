import React from 'react'
import {Button, Form} from 'react-bootstrap'

function Entry({data, onJoinClick, onCreateClick}) {

	return(
		<div id="entry-container" className="lobby">
			<div id="entry-name">
				<Form.Label>Name</Form.Label>
				<Form.Control type="text" value={data.name} onChange={data.onNameChange} />
			</div>
			<div>
				<div>Join Game</div>
				<Button variant="primary" onClick={onJoinClick} disabled={!data.name}>Join</Button>
			</div>
			<div>
				<div>Create Game</div>
				<Button variant="primary" onClick={onCreateClick} disabled={!data.name}>Create</Button>
			</div>
		</div>
	)
}

export default Entry;