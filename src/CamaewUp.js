function endSmallRound(G, ctx) {
	console.log("End of small round.")
	G.dice = Array(G.numCats).fill(0)
}

function moveCat(G, ctx, catID, roll) {
	
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
	if (!G.players[playerID].betCards[bet])
		console.error("Card has already been played.")
	G.bigStack[side].push({player: playerID, bet: bet})
	G.players[playerID].betCards[bet] = false
}

const CamaewUp = {
	name: "CamaewUp",
	setup: (ctx, setupData) => {
		let G = {
			numCats: setupData.numCats,
			dice: Array(setupData.numCats).fill(0),
			lastDiceRolled: -1,
			pos: Array(setupData.numCats).fill(-1),
			board: Array(16).fill({stack: [],
														 mod: {}}),
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
		},
		makeSmallBet: (G, ctx, playerID, bet) => {
			makeSmallBet(G, playerID, bet)
		},
		makeBigBet: (G, ctx, playerID, bet, side) => {
			makeBigBet(G, playerID, bet, side)
		}
	},
	turn: {
		moveLimit: 1
	},
	minPlayers: 2,
	maxPlayers: 8
}

export default CamaewUp;