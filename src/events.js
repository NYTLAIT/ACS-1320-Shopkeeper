export function randomEvent(state) {
    // Helper Functions:
    const cleanlinessClamp = cleanlinessEffect => {
        return (Math.max(0, Math.min(100, Math.floor(cleanlinessEffect))))
    }

    if (Math.random() > 0.3) return null;
    const roll = Math.floor(Math.random() * 12);

    switch (roll) {
        case 0:
            state.cleanliness += 10
            state.log.push("A helpful neighbor cleans up.");
            return null;

        case 1:
            const rollRaccoonMess = Math.random() * 20
            state.cleanliness -= cleanlinessClamp(rollRaccoonMess)
            state.log.push("A raccoon steals some food!")
            return { raccoonRansack: true}

        case 2:
            const rollFestivalBoostAndMess = Math.min(0.2, Math.random())
            state.cleanliness -= cleanlinessClamp(rollFestivalBoostAndMess * 60)
            state.log.push("A festival brought a lot of people!");
            return { eventMultiplier: 1 + rollFestivalBoostAndMess };

        case 3:
            state.log.push("Looks like it was payday today")
            return { eventMultiplier: 1.15 }

        case 4:
            state.log.push("Customers recommended the cafe to friends!")
            return { eventMultiplier: 1.05 }

        case 5:
            state.log.push("A nearby cafe ran a promotion")
            return { eventMultiplier: 0.80 }
        
        case 6:
            state.log.push("The opener had a little emergency and ran a bit late")
            return { eventMultiplier: 0.88 }

        case 7: 
            state.log.push("The payment crashed out for a short bit")
            return { eventMultiplier: 0.95 }

        case 8:
            state.log.push("A very popular item wasn't available today")
            return { eventMultiplier: 0.92 } 
        
        case 9:
            state.log.push("The cafe vibe felt a bit weird today")
            return { eventMultiplier: 0.90 }

        case 10:
            state.log.push("Students came to work on their finals")
            return { eventMultiplier: 1.10 }

        case 11:
            state.log.push("Something happened in the other nearby cafe")
            return { eventMultiplier: 1.12 }
    }
}

// Maybe add an event where one of the machines broke: no sale for one item and cost of repair
// if (event?.brokenProduct === id) {
//             dailyProductSales = 0
//         }