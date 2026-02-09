import { PRODUCTS } from "./products.js"

export function simulateDay(state, event) { // Events not yet implemented
    let revenue = 0
    let soldByItem = {}

    const { 
        inventory, 
        prices, 
        cleanliness, 
        promoDaysLeft 
    } = state

    const dayMultiplier = 0.80 + Math.random() * 0.30

    PRODUCTS.forEach ((product) => {
        const { id, baseDemand } = product

        const onHand = inventory[id] ?? 0
        let dailySales = baseDemand * dayMultiplier // raw stats with no buffs or debuffs yet

        if (cleanliness <= 40) {
           dailySales *= 0.6
        } else if (cleanliness >= 60) {
            dailySales *= 1.1
        }

        if (promoDaysLeft > 0) {
            dailySales *= 1.2
        } // Have not implemented the decreasing of it yet

        // Clamp
        dailySales = Math.round(dailySales)
        dailySales = Math.max(0, dailySales)
        dailySales = Math.min(dailySales, onHand)

        // Applying Effecs
        inventory[id] = onHand - dailySales

        const price = prices[id] ?? 0
        const productRevenue = dailySales * price

        soldByItem[id] = dailySales
        revenue += productRevenue
    })

    state.cashCents += revenue
    state.lastReport = { soldByItem, revenue, dayMultiplier }
}



