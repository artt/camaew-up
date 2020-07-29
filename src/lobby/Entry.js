import React from 'react'
import {Button, Form} from 'react-bootstrap'

export default function Entry({data, onJoinClick, onCreateClick}) {

	return(
		<div id="entry-container" className="lobby">
			<div id="entry-server">
				<Form.Label>Server</Form.Label>
				<Form.Control type="text" value={data.serverPath} onChange={data.onServerPathChange} />
			</div>
			<div>
				<Button variant="primary" onClick={onJoinClick} size="lg">Join Game</Button>
			</div>
			<div>
				<Button variant="primary" onClick={onCreateClick} size="lg">Create Game</Button>
			</div>
		</div>
	)
}
