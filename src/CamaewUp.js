function endSmallRound(G, ctx) {
	console.log("End of small round.")
	G.dice = Array(G.numCats).fill(0)
}

async function moveCat(G, ctx, catID, roll) {
	
	const curCellNum = G.pos[catID]
	let curStack = []

	if (curCellNum >= 0) {
		const curCell = G.board[curCellNum].stack
		const curLayer = curCell.indexOf(catID)
		curStack = curCell.slice(curLayer)
		// update old cell
		console.log("curStack", curStack)
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
	console.log("Resolving board...")

	if (mod === null) {
		console.log("Nothing to resolve.")
		return
	}
	else {
		// console.log("Before", G.board)
		const curStack = G.board[G.cleanUp].stack
		G.board[G.cleanUp].stack = []
		if (mod.type === "tape") {
			G.board[G.cleanUp - 1].stack = curStack.concat(G.board[G.cleanUp - 1].stack)
			// console.log("xxx", curStack, curStack.length)
			for (let i = 0; i < curStack.length; i ++) {
				// console.log("updating", i)
				// console.log(G.cleanUp + 1)
				// console.log(curStack[i])
				// console.log(G.pos)
				G.pos[curStack[i]] = G.cleanUp - 1
				// console.log(G.pos)
			}
			console.log("Got tape", G)
		}
		else if (mod.type === "cucumber") {
			G.board[G.cleanUp + 1].stack = G.board[G.cleanUp + 1].stack.concat(curStack)
			// console.log("xxx", curStack, curStack.length)
			for (let i = 0; i < curStack.length; i ++) {
				// console.log("updating", i)
				// console.log(G.cleanUp + 1)
				// console.log(curStack[i])
				// console.log(G.pos)
				G.pos[curStack[i]] = G.cleanUp + 1
				// console.log(G.pos)
			}
			console.log("Got cucumber", G)
		}
		// console.log("After", G.board)
	}

	return G

}

function rollDice(G, ctx) {

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
	console.log("Roll dice", j, "->", roll)

	// move cat `j`` by `roll` accordingly
	moveCat(G, ctx, j, roll)

	// if out of moves => end of small round
	if (numDiceLeft === 1) {
		endSmallRound(G, ctx)
	}

}

function makeSmallBet(G, playerID, bet) {
	G.players[playerID].smallBets[bet].push(G.smallStack[bet].pop())
}

function makeBigBet(G, playerID, bet, side) {
	G.bigStack[side].push({player: playerID, bet: bet})
	G.players[playerID].betCards[bet] = false
}

function placeMod(G, playerID, cellID, type) {
	G.board[cellID].mod = {playerID: playerID, type: type}
	G.players[playerID].hasMod = false
}

function removeMod(G, playerID, cellID) {
	G.board[cellID].mod = null
	G.players[playerID].hasMod = true
}

function reverseMod(G, cellID) {
	G.board[cellID].mod.type = G.board[cellID].mod.type === "tape" ? "cucumber" : "tape"
}

const CamaewUp = {
	name: "CamaewUp",
	setup: (ctx, setupData) => {
		let G = {
			numCats: setupData.numCats,
			dice: Array(setupData.numCats).fill(0),
			lastDiceRolled: -1,
			cleanUp: -1,
			pos: Array(setupData.numCats).fill(-1),
			board: Array(16).fill({stack: [],
														 mod: null}),
			players: Array(ctx.numPlayers).fill({smallBets: Array(setupData.numCats).fill([]),
																					 betCards: Array(setupData.numCats).fill(true),
																					 hasMod: true}),
			smallStack: Array(setupData.numCats).fill([2, 3, 5]),
			bigStack: {"win": [], "lose": []}
		}
		return G
	},
	moves: {
		roll: (G, ctx) => {
			rollDice(G, ctx)
			resolveBoard(G, ctx)
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
		removeMod: (G, ctx, playerID, cellID) => {
			removeMod(G, playerID, cellID)
		},
		flipMod: (G, ctx, playerID, cellID) => {
			const newType = G.board[cellID].mod.type === "tape" ? "cucumber" : "tape"
			removeMod(G, playerID, cellID)
			placeMod(G, playerID, cellID, newType)
		},
		moveMod: (G, ctx, playerID, oldCellID, newCellID, type) => {
			removeMod(G, playerID, oldCellID)
			placeMod(G, playerID, newCellID, type)
		}
	},
	turn: {
		moveLimit: 1
	},
	minPlayers: 2,
	maxPlayers: 8
}

export default CamaewUp;