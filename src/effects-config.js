export const config = {
	// Declare the effect types you need.
	effects: {
		// Each effect is named by its key.
		// This creates a zero-config endTurn effect:
		endTurn: {},

		roll: {
			create: (data) => (data),
			duration: 1,
		},
		// freeze dice
		rollDone: {
			create: (data) => (data),
			duration: 0.4,
		},
		rollMove: {
			create: (data) => (data),
			duration: 0.8,
		},
		rollReset: {
			create: (data) => (data),
		},

		moveFwd: {
			create: (data) => (data),
			duration: 0.3,
		},
		modTape: {
			create: (data) => (data),
			duration: 0.3,
		},
		modCucumber: {
			create: (data) => (data),
			duration: 0.3,
		},

		makeSmallBet: {
			create: (data) => (data),
			duration: 0.4,
		},

		endSmallRound: {}
	},
};