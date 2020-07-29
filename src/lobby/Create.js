import React from 'react'
import {Button, Form, ToggleButtonGroup, ToggleButton} from 'react-bootstrap'

export default function Create({data, onCreateCreateClick}) {

	return(
		<div className="lobby">
			<div>
				<Form.Label>Name</Form.Label>
				<Form.Control type="text" value={data.name} onChange={data.onNameChange} />
			</div>
			<div>
				<Form.Label>Number of players</Form.Label>
				<ToggleButtonGroup type="radio" name="numPlayers" value={data.numPlayers} onChange={data.onNumPlayersChange}>
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
				<ToggleButtonGroup type="radio" name="numCats" value={data.numCats} onChange={data.onNumCatsChange}>
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
				<Button variant="primary" onClick={onCreateCreateClick} disabled={!data.name}>Create</Button>
				<Button variant="secondary" onClick={data.backToEntry}>Back</Button>
			</div>
		</div>
	)

}
