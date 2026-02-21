export function randomEvent(state) {
    // Helper Functions:
    const cleanlinessClamp = cleanlinessEffect => {
        return (Math.max(0, Math.min(100, Math.floor(cleanlinessEffect))))
    }

    const events = [
        {
            num: 1,
            weight: 20,
            event: (state) => {
                state.cleanliness += 10;
                state.log.push("A helpful neighbor cleans up.");
                return null;
            }
        },{
            num: 2,
            weight: 10,
            event: (state) => {
                const rollRaccoonMess = Math.random() * 20;
                state.cleanliness -= cleanlinessClamp(rollRaccoonMess);
                state.log.push("A raccoon steals some food!");
                return { raccoonRansack: true };
            }
        },{
            num: 3,
            weight: 12,
            event: (state) => {
                const rollFestivalBoostAndMess = Math.min(0.2, Math.random());
                state.cleanliness -= cleanlinessClamp(rollFestivalBoostAndMess * 60);
                state.log.push("A festival brought a lot of people!");
                return { eventMultiplier: 1 + rollFestivalBoostAndMess };
            }
        },{
            num: 4,
            weight: 15,
            event: (state) => {
                state.log.push("Looks like it was payday today");
                return { eventMultiplier: 1.15 };
            }
        },{
            num: 5,
            weight: 18,
            event: (state) => {
                state.log.push("Customers recommended the cafe to friends!");
                return { eventMultiplier: 1.04 };
            }
        },{
            num: 6,
            weight: 10,
            event: (state) => {
                state.log.push("A nearby cafe ran a promotion");
                return { eventMultiplier: 0.80 };
            }
        },{
            num: 7,
            weight: 10,
            event: (state) => {
                state.log.push("The opener had a little emergency and ran a bit late");
                return { eventMultiplier: 0.88 };
            }
        },{
            num: 8,
            weight: 10,
            event: (state) => {
                state.log.push("The payment crashed out for a short bit");
                return { eventMultiplier: 0.95 };
            }
        },{
            num: 9,
            weight: 10,
            event: (state) => {
                state.log.push("A very popular item wasn't available today");
                return { eventMultiplier: 0.92 };
            }
        },{
            num: 10,
            weight: 10,
            event: (state) => {
                state.log.push("The cafe vibe felt a bit weird today");
                return { eventMultiplier: 0.90 };
            }
        },{
            num: 11,
            weight: 12,
            event: (state) => {
                state.log.push("Students came to work on their finals");
                return { eventMultiplier: 1.08 };
            }
        },{
            num: 12,
            weight: 12,
            event: (state) => {
                state.log.push("Something happened in the other nearby cafe");
                return { eventMultiplier: 1.12 };
            }
        }
    ];

    const pickWeightedEvent = events => {
        const totalWeight = events.reduce((acc, ev) => acc + ev.weight, 0);
        const roll = Math.floor(Math.random() * totalWeight);
        let running = 0;
        for (const ev of events) {
            running += ev.weight;
            if (roll < running) {
                return ev.event(state);
            }
        }
        return null;
    };

    if (Math.random() > 0.3) return null;
    return pickWeightedEvent(events);
}

// Maybe add an event where one of the machines broke: no sale for one item and cost of repair
// if (event?.brokenProduct === id) {
//             dailyProductSales = 0
//         }