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
		rollDone: {
			create: (data) => (data),
		},
		something: {}
	},
};