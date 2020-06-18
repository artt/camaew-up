import React from 'react'
import {Button} from 'react-bootstrap'

function Entry({data, onJoinClick, onCreateClick}) {

	return(
		<div id="entry-container" className="lobby">
			<div>
				<Button variant="primary" onClick={onJoinClick} size="lg">Join Game</Button>
			</div>
			<div>
				<Button variant="primary" onClick={onCreateClick} size="lg">Create Game</Button>
			</div>
		</div>
	)
}

export default Entry;