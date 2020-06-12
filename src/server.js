// const {Server} = require('boardgame.io/server')
// const {CamaewUp} = require('./CamaewUp')

// const server = Server({games: [CamaewUp]})

// server.run(8000)


import { Server } from 'boardgame.io/server';
import CamaewUp from './CamaewUp';

const PORT = process.env.PORT || 8000;
const server = Server({ games: [CamaewUp] });
server.run(PORT, () => {
  console.log(`Serving at: http://localhost:${PORT}/`);
});
