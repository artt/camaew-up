const {Server} = require('boardgame.io/server')
const {CamaewUp} = require('./CamaewUp')

const server = Server({games: [CamaewUp]})

server.run(8000)