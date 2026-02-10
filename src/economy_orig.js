

export function simulateDay(state, event) {
    let revenue = 0;
    let cleanlinessModifier = 0;

    // Cleanliness effect
    if (state.cleanliness < 40) {
    cleanlinessModifier = -1;
    }

    if (state.cleanliness > 70) {
    cleanlinessModifier = 1;
    }

    // Coffee sales
    let coffeeSold = 0;
    if (state.prices.coffee <= 350) {
        coffeeSold = Math.min(3, state.inventory.coffee);
    } else {
        coffeeSold = Math.min(1, state.inventory.coffee);
    }

    // Bagel sales
    let bagelSold = 0;
    if (state.prices.bagel <= 300) {
        bagelSold = Math.min(2, state.inventory.bagel);
    } else {
        bagelSold = Math.min(1, state.inventory.bagel);
    }
    
    // For cleanliness
    coffeeSold = Math.max(0, coffeeSold + cleanlinessModifier);
    bagelSold = Math.max(0, bagelSold + cleanlinessModifier);

    // Promo
    if (state.promoDaysLeft > 0) {
        coffeeSold += 1;
        bagelSold += 1;
    }

    // Events (bus tour, raccoon, bad weather)
    if (event?.demandBoost) {
        coffeeSold += event.demandBoost
        bagelSold += event.demandBoost
    }
    if (event?.steal == true) {
        roll = Math.random()
        if (roll < 0.33) {
            state.inventory.coffee -= 1
        } else if (roll > 0.66) {
            state.inventory.bagel -= 1
        } else {
            state.inventory.tea -= 1
        }
    }
    if (event?.noBagels == true) {
        bagelSold = 0
    }

    // Inventory limit and guard
    coffeeSold = Math.min(coffeeSold, state.inventory.coffee);
    bagelSold = Math.min(bagelSold, state.inventory.bagel);

    // Update state
    state.inventory.coffee -= coffeeSold;
    state.inventory.bagel -= bagelSold;

    // Revenue calculations
    revenue += coffeeSold * state.prices.coffee;
    revenue += bagelSold * state.prices.bagel;

    state.cashCents += revenue;
    state.lastReport = {
        soldByItem: {
            coffee: coffeeSold,
            bagel: bagelSold
        },
        revenue
    };
}