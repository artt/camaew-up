import React, {Fragment} from 'react'
import Board from './Board'
import './style.css'


function test() {
	console.log('xxx')
}

function Main({G, ctx, moves}) {

	return(
		<Fragment>
			<h1 onClick={moves.roll}>Camaew Up!</h1>
			<Board G={G} />
		</Fragment>
	);

}

export default Main;