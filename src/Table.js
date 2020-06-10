import React, {useState} from 'react'

function Table({onJoinChange, onJoinClick, onCreateClick}) {

	const [joinID, setJoinID] = useState()


	return(
		<div>
			<div>
				<h1>Create Game</h1>
				<button onClick={onCreateClick}>Create</button>
			</div>
			<div>
				<h1>Join Game</h1>
				<input type="text" onChange={onJoinChange} />
				<button onClick={onJoinClick}>Join</button>
			</div>
		</div>
	)

}

export default Table;