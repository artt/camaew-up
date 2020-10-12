import {sum, cloneDeep} from 'lodash'
import { EffectsPlugin } from 'bgio-effects/plugin';
import { config } from './effects-config';
import {random} from 'lodash'

const jitter = {angle: 7.5, x: 5, y: 5}

function genArray(size, data) {
	let a = new Array(size );
	for (let i = 0; i < size; i ++) {
		a[i] = cloneDeep(data);
	}
	return a
}

function rankCats(G) {
	let indices = Array.from(new Array(G.numCats), (x, i) => i)	
	indices.sort((a, b) => (G.cats[b][0] - G.cats[a][0]) * 100 + (G.cats[b][1] - G.cats[a][1]));	
	return indices
}

function resetSmallRound(G, ctx) {
	// reset dice
	G.dice = Array(G.numCats).fill(0)

	for (let i = 0; i < ctx.numPlayers; i ++) {
		G.players[i].smallBets = Array(G.numCats).fill([])
		removeMod(G, i)
	}

	G.smallStack = Array(G.numCats).fill([2, 3, 5])
	placeSmallStacks(G)

}

function scoreSmallRound(G, ctx) {
	// console.log("End of small round.")

	// reset dice
	G.dice = Array(G.numCats).fill(0)

	// get ranks
	const rank = rankCats(G)

	for (let i = 0; i < ctx.numPlayers; i ++) {
		
		// small bets
		let smallBetWins = 0
		smallBetWins += sum(G.players[i].smallBets[rank[0]])
		smallBetWins += G.players[i].smallBets[rank[1]].length
		for (let j = 2; j < G.numCats; j ++) {
			smallBetWins -= G.players[i].smallBets[rank[j]].length	
		}
		// console.log("Small bet wins for", i, smallBetWins)
		G.players[i].coins += smallBetWins
		// G.players[i].smallBets = Array(G.numCats).fill([])
	
		// remove mods
		// removeMod(G, i)

	}

	// G.smallStack = Array(G.numCats).fill([2, 3, 5])

}

function scoreRace(G, ctx) {
	// console.log("End of race.")
	const rank = rankCats(G)

	// winning pile
	let winnings = [1, 2, 3, 5, 8]
	for (let i = 0; i < G.bigStack.win.length; i ++) {
		const curBet = G.bigStack.win[i]
		if (curBet.bet === rank[0]) {
			// winning bet
			G.players[curBet.playerID].coins += winnings.pop()
		}
		else {
			G.players[curBet.playerID].coins -= 1
		}
		if (winnings.length === 0)
			winnings = [1]
	}

	// losing pile
	let losings = [1, 2, 3, 5, 8]
	for (let i = 0; i < G.bigStack.lose.length; i ++) {
		const curBet = G.bigStack.lose[i]
		if (curBet.bet === rank[G.numCats - 1]) {
			// winning bet
			G.players[curBet.playerID].coins += losings.pop()
		}
		else {
			G.players[curBet.playerID].coins -= 1
		}
		if (losings.length === 0)
			losings = [1]
	}

}

function getWinners(G) {
	let maxCoins = [G.players[0].coins]
	let winners = [0]
	for (let i = 1; i < G.numPlayers; i ++) {
		if (G.players[i].coins > maxCoins) {
			maxCoins = G.players[i].coins
			winners = [i]
		}
		else if (G.players[i].coins === maxCoins) {
			winners.push(i)
		}
	}
	return winners
}

function moveCat(G, ctx, catID, roll) {

	const curCellNum = G.cats[catID][0]

	let curStack = []

	// check if the cat in question is already on the board
	if (curCellNum >= 0) {
		const curCell = G.board[curCellNum].stack
		const curLayer = curCell.indexOf(catID)
		curStack = curCell.slice(curLayer)
		// update old cell
		G.board[curCellNum].stack = G.board[curCellNum].stack.slice(0, curLayer)
	}
	// if not then there's no need to worry about cats stacked on top
	else {
		curStack = [catID]
	}

	// update new cell
	const destCellHeight = G.board[curCellNum + roll].stack.length
	G.board[curCellNum + roll].stack = G.board[curCellNum + roll].stack.concat(curStack)
	for (let i = 0; i < curStack.length; i ++) {
		// G.pos[curStack[i]] += roll
		G.cats[curStack[i]] = [curCellNum + roll, destCellHeight + i]
	}

	G.cleanUp = curCellNum + roll

}

function resolveBoard(G, ctx) {

	const mod = G.board[G.cleanUp].mod

	if (mod !== null) {
		log(G, {move: "mod", mod: mod.type})
		G.players[mod.playerID].coins += 1
		const curStack = G.board[G.cleanUp].stack.slice()
		G.board[G.cleanUp].stack = []
		let dest = 999

		if (mod.type === "tape") {
			dest = G.cleanUp - 1
			ctx.effects.modTape({cellNum: G.cleanUp, preCats: cloneDeep(G.cats), prevStack: G.board[G.cleanUp - 1].stack.slice(), stack: curStack})
			G.board[dest].stack = curStack.concat(G.board[dest].stack)
		}
		else if (mod.type === "cucumber") {
			dest = G.cleanUp + 1
			ctx.effects.modCucumber({cellNum: G.cleanUp, preCats: cloneDeep(G.cats), destHeight: G.board[dest].stack.length, stack: curStack})
			G.board[dest].stack = G.board[dest].stack.concat(curStack)
		}

		for (let i = 0; i < G.board[dest].stack.length; i ++) {
			G.cats[G.board[dest].stack[i]] = [dest, i]
		}
	}

}

function rollDice(G, ctx, playerID) {

	// random dice first
	const numDiceLeft = G.dice.filter(x => x === 0).length
	const dieRolled = ctx.random.Die(numDiceLeft) - 1
	const roll = ctx.random.Die(3)
	let i = 0
	let j = 0
	for (j = 0; j < G.numCats; j ++) {
		if (G.dice[j] === 0) {
			if (i === dieRolled) {
				G.dice[j] = roll;
				G.lastDiceRolled = j;
				break
			}
			i ++
		}
	}
	if (j === G.numCats) {
		console.error("Something's wrong. The dice probably didn't get reset.")
	}

	// move cat `j`` by `roll` accordingly
	moveCat(G, ctx, j, roll)
	if (playerID != null)
		G.players[playerID].coins += 1

	return [j, roll]

}

function makeSmallBet(G, playerID, bet) {
	const card = G.smallStack[bet].pop()
	G.players[playerID].smallBets[bet].push(card)
	return card
}

function makeBigBet(G, playerID, bet, side) {
	G.bigStack[side].push({playerID: playerID, bet: bet})
	G.players[playerID].betCards[bet] = false
	G.bigStackPos[side].push([random(-jitter.x, jitter.x, true),
														random(-jitter.y, jitter.y, true),
														random(-jitter.angle, jitter.angle, true)])
}

function placeMod(G, playerID, cellID, type) {
	G.board[cellID].mod = {playerID: playerID, type: type}
	G.players[playerID].modPos = cellID
}

function removeMod(G, playerID) {
	if (G.players[playerID].modPos > -1) {
		G.board[G.players[playerID].modPos].mod = null
		G.players[playerID].modPos = -1	
	}
}

function log(G, message) {
	G.logArray.push(message)
}

function jitterBigStack(G, side) {
	for (let i = 0; i < G.bigStackPos[side].length; i ++) {
		G.bigStackPos[side][i] = [random(-jitter.x, jitter.x, true),
															random(-jitter.y, jitter.y, true),
															random(-jitter.angle, jitter.angle, true)]
	}
}

function jitterSmallStack(G, i) {
	for (let j = 0; j < 3; j ++) {
		G.smallStackPos[i][j] = [random(-jitter.x, jitter.x, true),
															random(-jitter.y, jitter.y, true),
															random(-jitter.angle, jitter.angle, true)]
	}
}

function placeSmallStacks(G) {
	for (let i = 0; i < G.numCats; i ++) {
		jitterSmallStack(G, i)
	}
}

const CamaewUp = {
	name: "CamaewUp",
	plugins: [EffectsPlugin(config)],
	setup: (ctx, setupData) => {
		let G = {
			dice: Array(setupData.numCats).fill(0),
			cats: Array(setupData.numCats).fill([-1, -1]),
			board: genArray(setupData.numTiles + 3, {stack: [], mod: null}),
			players: genArray(ctx.numPlayers, {coins: 3,
																					smallBets: Array(setupData.numCats).fill([]),
																					betCards: Array(setupData.numCats).fill(true),
																					modPos: -1}),
			smallStack: Array(setupData.numCats).fill([2, 3, 5]),
			smallStackPos: genArray(setupData.numCats, Array(3).fill([0, 0, 0])),
			bigStack: {"win": [], "lose": []},
			bigStackPos: {"win": [], "lose": []},
			logArray: [],
			numCats: setupData.numCats,
			numTiles: setupData.numTiles,
			numPlayers: ctx.numPlayers,
			lastDiceRolled: -1,
			cleanUp: -1,
		}
		log(G, {move: "text", text: "Welcome!"})

		for (let i = 0; i < G.numCats; i ++) {
			rollDice(G, ctx)
		}
		resetSmallRound(G, ctx)
		return G
	},
	moves: {
		roll: (G, ctx, playerID) => {
			const preCats = cloneDeep(G.cats)
			const preBoard = cloneDeep(G.board)
			const [catID, roll] = rollDice(G, ctx, playerID)
			ctx.effects.roll(catID)
			ctx.effects.rollDone(roll)
			ctx.effects.rollReset(G.dice.slice())
			for (let i = 0; i < roll; i ++) {
				ctx.effects.moveFwd({catID: catID, roll: i, preCats: preCats, preBoard: preBoard})
			}
			log(G, {playerID: playerID, move: "roll", catID: catID, roll: roll})
			resolveBoard(G, ctx)
			if (G.cleanUp >= G.numTiles) {
				// end game
				scoreSmallRound(G, ctx)
				scoreRace(G, ctx)
				const winners = getWinners(G)
				log(G, {move: "text", text: "Winners: " + winners})
				log(G, {move: "text", text: "--- End of game ---"})
			}
			if (G.dice.filter(x => x === 0).length === 0) {
				log(G, {move: "text", text: "--- End of small round ---"})
				scoreSmallRound(G, ctx)
				resetSmallRound(G, ctx)
			}
		},
		makeSmallBet: (G, ctx, playerID, bet) => {
			const card = makeSmallBet(G, playerID, bet)
			log(G, {playerID: playerID, move: "smallBet", catID: bet, card: card})
		},
		makeBigBet: (G, ctx, playerID, bet, side) => {
			makeBigBet(G, playerID, bet, side)
			log(G, {playerID: playerID, move: "bigBet", side: side})
		},
		placeMod: (G, ctx, playerID, cellID, type) => {
			placeMod(G, playerID, cellID, type)
			log(G, {playerID: playerID, move: "placeMod", cellID: cellID, type: type})
		},
		removeMod: (G, ctx, playerID) => {
			removeMod(G, playerID)
			log(G, {playerID: playerID, move: "removeMod", cellID: G.players[playerID].modPos})
		},
		flipMod: (G, ctx, playerID) => {
			const newType = G.board[G.players[playerID].modPos].mod.type === "tape" ? "cucumber" : "tape"
			const cellID = G.players[playerID].modPos
			removeMod(G, playerID)
			placeMod(G, playerID, cellID, newType)
			log(G, {playerID: playerID, move: "flipMod", cellID: G.players[playerID].modPos})
		},
		moveMod: (G, ctx, playerID, cellID, type) => {
			removeMod(G, playerID)
			placeMod(G, playerID, cellID, type)
			log(G, {playerID: playerID, move: "placeMod", cellID: cellID, type: type})
		},
		jitter: {
			move: (G, ctx, stack) => {
				if (stack === 'lose' || stack === 'win') {
					jitterBigStack(G, stack)
				}
				else {
					jitterSmallStack(G, stack)
				}
			},
			noLimit: true,
			redact: true,
      client: true
		}
	},
	turn: {
		moveLimit: 1,
		onEnd: (G, ctx) => {
		},
		onMove: (G, ctx) => {
		}
	},
	minPlayers: 2,
	maxPlayers: 8
}

export default CamaewUp;