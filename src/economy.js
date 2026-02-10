import { PRODUCTS } from "./products.js"

export function simulateDay(state, event) {
    let revenue = 0
    let soldByItem = {}
    let dailyMultiplier = 1

    // DAILY RANDOMNESS
    const dailyMultiplierRoll = Math.random()
    if (dailyMultiplierRoll < 0.1) {
        dailyMultiplier = 0.7
        state.log.push("Terrible day -- curse you overly snowy weather")
    } else if (dailyMultiplierRoll < 0.3) {
        dailyMultiplier = 0.85
        state.log.push("Slow day -- fewer customers than usual")
    } else if (dailyMultiplierRoll < 0.85) {
        dailyMultiplier = 1
        state.log.push("Normal day -- another satisfactory day")
    } else {
        dailyMultiplier = 1.25
        state.log.push("Great day -- lunch rush was huge")
    }
    console.log(`Day Multiplier ${dailyMultiplier}`)

    const {
        inventory,
        prices,
        cleanliness,
        promoDaysLeft
    } = state

    PRODUCTS.forEach((product) => {
        const { id, baseDemand } = product

        const productMultiplier = 0.80 + Math.random() * 0.30
        let onHand = inventory[id] ?? 0
        let dailyProductSales = baseDemand * productMultiplier * dailyMultiplier// raw stats with no buffs or debuffs yet

        console.log(`${id} Base Product: ${baseDemand} * Product Multiplier: ${productMultiplier} * Day Multiplier: ${dailyMultiplier} = ${dailyProductSales}`)

        if (cleanliness <= 40) {
            dailyProductSales *= 0.6
        } else if (cleanliness >= 80) {
            dailyProductSales *= 1.1
        }

        if (promoDaysLeft > 0) {
            dailyProductSales *= 1.2
        }

        if (event?.eventMultiplier) {
            dailyProductSales *= event.eventMultiplier
        }
        if (event?.raccoonRansack) {
            onHand -= Math.max(0, Math.min(Math.floor(Math.random() * 11), onHand))
        }

        // Clamp: onHand changes must be implemented before or it will break
        dailyProductSales = Math.round(dailyProductSales)
        dailyProductSales = Math.max(0, dailyProductSales)
        dailyProductSales = Math.min(dailyProductSales, onHand)

        // Applying Effects
        inventory[id] = onHand - dailyProductSales

        const price = prices[id] ?? 0
        const productRevenue = dailyProductSales * price

        soldByItem[id] = dailyProductSales
        revenue += productRevenue

        console.log(`${id} Final Sales ${dailyProductSales}`)
    })

    // Promo Day
    if (state.promoDaysLeft > 0) {state.promoDaysLeft -= 1}

    state.cashCents += revenue
    state.lastReport = { soldByItem, revenue }
}



