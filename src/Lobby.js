import React, {useState} from 'react'

function Lobby({onNameChange, onJoinChange, onJoinClick, onCreateClick}) {

	const [joinID, setJoinID] = useState()

	return(
		<div id="lobby-container" className="lobby">
			<div id="lobby-name">
				<div>Name</div>
				<input type="text" onChange={onNameChange} />
			</div>
			<div id="lobby-join" className="center">
				<div>Join Game</div>
				<input type="text" onChange={onJoinChange} />
				<button onClick={onJoinClick}>Join</button>
			</div>
			<div id="lobby-create" className="center">
				<div>Create Game</div>
				<button onClick={onCreateClick}>Create</button>
			</div>
		</div>
	)

}

export default Lobby;