// This file defines the game state.
// Think of this like the "database" for the game.

export function makeInitialState() {
    return {
        day: 1,
        cashCents: 2500, // $25.00
        cleanliness: 60,
        promoDaysLeft: 0,

        inventory: {
        coffee: 5,
        bagel: 5
        },

        prices: {
        coffee: 300, // cents
        bagel: 250
        },

        orderedToday: false,

        gameOver: false,

        lastReport: null,
        log: ["Welcome to your new shop!"]
    };
}