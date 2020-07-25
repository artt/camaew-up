import {sum, cloneDeep} from 'lodash'

function genArray(size, data) {
	let a = new Array(size );
	for (let i = 0; i < size; i ++) {
		a[i] = cloneDeep(data);
	}
	return a
}

function rankCats(G) {
	let indices = Array.from(new Array(G.numCats), (x, i) => i)
	indices.sort((a, b) => {
		if (G.pos[a] !== G.pos[b])
			return G.pos[b] - G.pos[a]
		else {
			// break tie with stack order
			const stack = G.board[G.pos[a]].stack
			return stack.indexOf(b) - stack.indexOf(a)
		}
	});
	return indices
	// let ret = Array(G.numCats)
	// for (let i = 0; i < G.numCats; i ++) {
	// 	ret[indices[i]] = i
	// }
	// return ret;
}

function resetSmallRound(G, ctx) {
	// reset dice
	G.dice = Array(G.numCats).fill(0)

	for (let i = 0; i < ctx.numPlayers; i ++) {
		G.players[i].smallBets = Array(G.numCats).fill([])
		removeMod(G, i)
	}

	G.smallStack = Array(G.numCats).fill([2, 3, 5])

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

function moveCat(G, ctx, catID, roll) {

	const curCellNum = G.pos[catID]
	let curStack = []

	if (curCellNum >= 0) {
		const curCell = G.board[curCellNum].stack
		const curLayer = curCell.indexOf(catID)
		curStack = curCell.slice(curLayer)
		// update old cell
		// console.log("curStack", curStack)
		G.board[curCellNum].stack = G.board[curCellNum].stack.slice(0, curLayer)
	}
	else {
		curStack = [catID]
	}
	// update new cell
	G.board[curCellNum + roll].stack = G.board[curCellNum + roll].stack.concat(curStack)

	for (let i = 0; i < curStack.length; i ++) {
		G.pos[curStack[i]] += roll	
	}

	G.cleanUp = curCellNum + roll

	// await new Promise(r => setTimeout(r, 1000));
	// // setTimeout(() => resolveBoard(G, ctx, curCellNum + roll), 1000)
	// resolveBoard(G, ctx, curCellNum + roll)

}

function resolveBoard(G, ctx) {

	const mod = G.board[G.cleanUp].mod

	if (mod === null) {
		return
	}
	else {
		G.players[mod.playerID].coins += 1
		const curStack = G.board[G.cleanUp].stack
		G.board[G.cleanUp].stack = []
		if (mod.type === "tape") {
			G.board[G.cleanUp - 1].stack = curStack.concat(G.board[G.cleanUp - 1].stack)
			for (let i = 0; i < curStack.length; i ++) {
				G.pos[curStack[i]] = G.cleanUp - 1
			}
			// console.log("Got taped")
		}
		else if (mod.type === "cucumber") {
			G.board[G.cleanUp + 1].stack = G.board[G.cleanUp + 1].stack.concat(curStack)
			for (let i = 0; i < curStack.length; i ++) {
				G.pos[curStack[i]] = G.cleanUp + 1
			}
			// console.log("Got cucumbered")
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
	// console.log("Roll dice", j, "->", roll)
	log(G, {playerID: playerID, type: "roll", catID: j, roll: roll})

	// move cat `j`` by `roll` accordingly
	moveCat(G, ctx, j, roll)
	if (playerID != null)
		G.players[playerID].coins += 1

}

function makeSmallBet(G, playerID, bet) {
	G.players[playerID].smallBets[bet].push(G.smallStack[bet].pop())
}

function makeBigBet(G, playerID, bet, side) {
	G.bigStack[side].push({playerID: playerID, bet: bet})
	G.players[playerID].betCards[bet] = false
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

const CamaewUp = {
	name: "CamaewUp",
	setup: (ctx, setupData) => {
		let G = {
			numCats: setupData.numCats,
			numTiles: setupData.numTiles,
			dice: Array(setupData.numCats).fill(0),
			lastDiceRolled: -1,
			cleanUp: -1,
			pos: Array(setupData.numCats).fill(-1),
			board: genArray(setupData.numTiles + 3, {stack: [], mod: null}),
			players: genArray(ctx.numPlayers, {coins: 3,
																					smallBets: Array(setupData.numCats).fill([]),
																					betCards: Array(setupData.numCats).fill(true),
																					modPos: -1}),
			smallStack: Array(setupData.numCats).fill([2, 3, 5]),
			bigStack: {"win": [], "lose": []},
			logArray: ['abc'],
		}
		log(G, {type: "text", text: "Welcome!"})

		for (let i = 0; i < G.numCats; i ++)
			rollDice(G, ctx)
		resetSmallRound(G, ctx)
		return G
	},
	moves: {
		roll: (G, ctx, playerID) => {
			rollDice(G, ctx, playerID)
			resolveBoard(G, ctx)
			if (G.cleanUp >= G.numTiles) {
				// end game
				scoreSmallRound(G, ctx)
				scoreRace(G, ctx)
			}
			if (G.dice.filter(x => x === 0).length === 0) {
				scoreSmallRound(G, ctx)
				resetSmallRound(G, ctx)
			}
		},
		makeSmallBet: (G, ctx, playerID, bet) => {
			makeSmallBet(G, playerID, bet)
		},
		makeBigBet: (G, ctx, playerID, bet, side) => {
			makeBigBet(G, playerID, bet, side)
		},
		placeMod: (G, ctx, playerID, cellID, type) => {
			placeMod(G, playerID, cellID, type)
		},
		removeMod: (G, ctx, playerID) => {
			removeMod(G, playerID)
		},
		flipMod: (G, ctx, playerID) => {
			const newType = G.board[G.players[playerID].modPos].mod.type === "tape" ? "cucumber" : "tape"
			const cellID = G.players[playerID].modPos
			removeMod(G, playerID)
			placeMod(G, playerID, cellID, newType)
		},
		moveMod: (G, ctx, playerID, newCellID, type) => {
			removeMod(G, playerID)
			placeMod(G, playerID, newCellID, type)
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