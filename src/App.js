import {Client} from 'boardgame.io/react'
import {CamaewUp} from './Game'
import Board from './Board'

const App = Client({game: CamaewUp,
                    board: Board,
                    numPlayers: 4})

export default App;
