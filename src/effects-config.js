export const config = {
	// Declare the effect types you need.
	effects: {
		// Each effect is named by its key.
		// This creates a zero-config endTurn effect:
		endTurn: {},

		roll: {
			// Effects can declare a `create` function.
			// If defined, the return value of create will be
			// available as the payload for an effect.
			create: (value) => ({ value }),

			// Effects can declare a default duration in seconds
			// (see “Sequencing effects” below).
			duration: 2,
		},
		something: {}
	},
};