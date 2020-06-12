const NUM_CATS = 5

function endSmallRound(G, ctx) {
	console.log("End of small round.")
	G.dice = Array(NUM_CATS).fill(0)
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
	for (j = 0; j < NUM_CATS; j ++) {
		if (G.dice[j] === 0) {
			if (i === dieRolled) {
				G.dice[j] = roll;
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

const CamaewUp = {
	name: "CamaewUp",
	setup: (ctx) => {
		let G = {
			dice: Array(NUM_CATS).fill(0),
			pos: Array(NUM_CATS).fill(-1),
			board: Array(16).fill({stack: [],
														 mod: {}}),
			players: Array(ctx.numPlayers).fill({name: "",
																					 smallBet: [],
																					 betCards: Array(NUM_CATS).fill(true)}),
			smallStack: Array(NUM_CATS).fill([2, 3, 5]),
			betWin: [],
			betLose: []
		}
		return G
	},
	moves: {
		roll: (G, ctx) => {
			rollDice(G, ctx)
		}
	}
}

export default CamaewUp;