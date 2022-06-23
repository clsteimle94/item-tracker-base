/**
 * @typedef Item
 * @property {string} id unique id per clickable item
 * @property {number} itemPool number of cyclable items
 * @property {number} state starting state for the item (sometimes you always start with an item)
 * @property {string[]} pics pictures used for the item (see below for possibilities)
 */

// pics[] :
//      [off&on]
//      [off, on] *there should one more picture than the item pool
//      [off&on, state1, state2, ...]
//      [off, on, state1, state2, ...] *there should one more picture than the item pool

/**
 * @typedef CountableItem
 * @property {string} id unique id per clickable item
 * @property {number} itemPool number of cyclable items
 * @property {number} state starting state for the item (sometimes you always start with an item)
 * @property {string} pics picture used for the item
 * @property {number} max max count for the item
 */

/**
 * @typedef Counter
 * @property {string} id unique id per clickable counter
 * @property {number} state starting value for the counter
 * @property {number} max max count for the counter
 */


export const trackerContent = {

    /** @type {Item[]} */
    upgrades: [
        {
            id: "boots",
            itemPool: 3,
            state: 1,
            pics: [
                require("./assets/pic/sample-icons/upgrades/boots1.png"),
                require("./assets/pic/sample-icons/upgrades/boots2.png"),
                require("./assets/pic/sample-icons/upgrades/boots3.png"),
            ],
        },
        {
            id: "hammer",
            itemPool: 3,
            state: 1,
            pics: [
                require("./assets/pic/sample-icons/upgrades/hammer1.png"),
                require("./assets/pic/sample-icons/upgrades/hammer2.png"),
                require("./assets/pic/sample-icons/upgrades/hammer3.png"),
            ],
        },
        {
            id: "ultrastone",
            itemPool: 1,
            state: 0,
            pics: [require("./assets/pic/sample-icons/upgrades/ultrastone.png")],
        },
    ],


    /** @type {Item[]} */
    partners: [
        {
            id: "goombario",
            itemPool: 1,
            state: 0,
            pics: [require("./assets/pic/sample-icons/partners/goombario.png")],
        },
        {
            id: "kooper",
            itemPool: 1,
            state: 0,
            pics: [require("./assets/pic/sample-icons/partners/kooper.png")],
        },
        {
            id: "bombette",
            itemPool: 1,
            state: 0,
            pics: [require("./assets/pic/sample-icons/partners/bombette.png")],
        },
        {
            id: "parakarry",
            itemPool: 1,
            state: 0,
            pics: [require("./assets/pic/sample-icons/partners/parakarry.png")],
        },
        {
            id: "bow",
            itemPool: 1,
            state: 0,
            pics: [require("./assets/pic/sample-icons/partners/bow.png")],
        },
        {
            id: "watt",
            itemPool: 1,
            state: 0,
            pics: [require("./assets/pic/sample-icons/partners/watt.png")],
        },
        {
            id: "sushi",
            itemPool: 1,
            state: 0,
            pics: [require("./assets/pic/sample-icons/partners/sushi.png")],
        },
        {
            id: "lakilester",
            itemPool: 1,
            state: 0,
            pics: [require("./assets/pic/sample-icons/partners/lakilester.png")],
        },
    ],


    /** @type {CountableItem[]} */
    countables: [
        {
            id: "wattCount",
            itemPool: 1,
            state: 0,
            pic: require("./assets/pic/sample-icons/partners/watt.png"),
            max: 3,
        },
        {
            id: "bowCount",
            itemPool: 1,
            state: 0,
            pic: require("./assets/pic/sample-icons/partners/bow.png"),
            max: 12,
        },
    ],


    /** @type {Counter[]} */
    counters: [
        {
            id: "counter1",
            state: 0,
            max: 10,
        },
    ],
}

