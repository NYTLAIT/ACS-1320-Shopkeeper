// This file updates state based on actions.
import { simulateDay } from "./economy.js";
import { randomEvent } from './events.js'

export function update(state, action) {
    // Make a copy so we don’t change the original
    const newState = structuredClone(state);

    if (action.type === "NEXT_DAY") {
        newState.day += 1;
        newState.log.push("A new day begins.");
    }

    if (action.type === "CLEAN") {
        newState.cleanliness += 10;
        if (newState.cleanliness > 100) {
        newState.cleanliness = 100;
        }
        newState.log.push("You cleaned the shop.");
    }

    if (action.type === "SET_PRICE") {
        const { item, price } = action;
        newState.prices[item] = price;
    }
    
    if (action.type === "OPEN_SHOP") {
        const event = randomEvent(newState);
        simulateDay(newState, event);
        newState.day += 1;
        newState.log.push("You opened the shop.");
        if (newState.promoDaysLeft > 0) {
            newState.promoDaysLeft -= 1;
        }
    }
        
    if (action.type === "PROMO") {
        if (newState.cashCents >= 300) {
            newState.cashCents -= 300;
            newState.promoDaysLeft = 2;
            newState.log.push("You ran a promotion.");
        } else {
            newState.log.push("Not enough cash to run a promotion.");
        }
    }

  return newState;
}