import React from 'react'
import {Button, Form, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'

function Create({data, onCreateCreateClick}) {

	const [numPlayers, setnumPlayers] = React.useState(4);
	const [numCats, setNumCats] = React.useState(5);

	function onNumPlayersChange(val) {
		setnumPlayers(val)
	}

	function onNumCatsChange(val) {
		setNumCats(val)
	}

	return(
		<div className="lobby">
			<div>
				<Form.Label>Name</Form.Label>
				<Form.Control type="text" value={data.name} onChange={data.onNameChange} />
			</div>
			<div>
				<Form.Label>Number of players</Form.Label>
				<ToggleButtonGroup type="radio" name="numPlayers" value={numPlayers} onChange={onNumPlayersChange}>
					<ToggleButton value={2}>2</ToggleButton>
					<ToggleButton value={3}>3</ToggleButton>
					<ToggleButton value={4}>4</ToggleButton>
					<ToggleButton value={5}>5</ToggleButton>
					<ToggleButton value={6}>6</ToggleButton>
					<ToggleButton value={7}>7</ToggleButton>
					<ToggleButton value={8}>8</ToggleButton>
				</ToggleButtonGroup>
			</div>
			<div>
				<Form.Label>Number of cats</Form.Label>
				<ToggleButtonGroup type="radio" name="numCats" value={numCats} onChange={onNumCatsChange}>
					<ToggleButton value={3}>3</ToggleButton>
					<ToggleButton value={4}>4</ToggleButton>
					<ToggleButton value={5}>5</ToggleButton>
					<ToggleButton value={6}>6</ToggleButton>
				</ToggleButtonGroup>
			</div>
			<div>
				<Form.Check type="checkbox" label="Veil mode" />
				<Form.Check type="checkbox" label="Random seat" />
			</div>
			<div>
				<Button variant="primary" onClick={() => onCreateCreateClick({numPlayers: numPlayers, numCats: numCats})} disabled={!data.name}>Create</Button>
			</div>
		</div>
	)

}

export default Create;