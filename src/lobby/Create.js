import React from 'react'
import {Button, Form, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'

function Create({data, onCreateCreateClick}) {

	const [maxPlayers, setMaxPlayers] = React.useState(4);
	const [numCats, setNumCats] = React.useState(5);

	function onMaxPlayersChange(val) {
		setMaxPlayers(val)
	}

	function onNumCatsChange(val) {
		setNumCats(val)
	}

	return(
		<div className="lobby">
			<div>
				<Form.Label>Max players</Form.Label>
				<ToggleButtonGroup type="radio" name="maxPlayers" value={maxPlayers} onChange={onMaxPlayersChange}>
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
				<Button variant="primary" onClick={() => onCreateCreateClick({maxPlayers: maxPlayers, numCats: numCats})}>Create</Button>
			</div>
		</div>
	)

}

export default Create;