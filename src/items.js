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

/** @type {Item[]} */
export const upgradeList = [
    {
        id: "boots",
        itemPool: 3,
        state: 1,
        pics: [
            require("./assets/pic/sample-icons/upgrades/boots1.png"),
            require("./assets/pic/sample-icons/upgrades/boots2.png"),
            require("./assets/pic/sample-icons/upgrades/boots3.png"),
        ],
        max: 1,
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
        max: 1,
    },
    {
        id: "ultrastone",
        itemPool: 1,
        state: 0,
        pics: [require("./assets/pic/sample-icons/upgrades/ultrastone.png")],
        max: 1,
    },
];

/** @type {Item[]} */
export const partnerList = [
    {
        id: "goombario",
        itemPool: 1,
        state: 0,
        pics: [require("./assets/pic/sample-icons/partners/goombario.png")],
        max: 1,
    },
    {
        id: "kooper",
        itemPool: 1,
        state: 0,
        pics: [require("./assets/pic/sample-icons/partners/kooper.png")],
        max: 1,
    },
    {
        id: "bombette",
        itemPool: 1,
        state: 0,
        pics: [require("./assets/pic/sample-icons/partners/bombette.png")],
        max: 1,
    },
    {
        id: "parakarry",
        itemPool: 1,
        state: 0,
        pics: [require("./assets/pic/sample-icons/partners/parakarry.png")],
        max: 1,
    },
    {
        id: "bow",
        itemPool: 1,
        state: 0,
        pics: [require("./assets/pic/sample-icons/partners/bow.png")],
        max: 1,
    },
    {
        id: "watt",
        itemPool: 1,
        state: 0,
        pics: [require("./assets/pic/sample-icons/partners/watt.png")],
        max: 1,
    },
    {
        id: "sushi",
        itemPool: 1,
        state: 0,
        pics: [require("./assets/pic/sample-icons/partners/sushi.png")],
        max: 1,
    },
    {
        id: "lukister",
        itemPool: 1,
        state: 0,
        pics: [require("./assets/pic/sample-icons/partners/lukister.png")],
        max: 1,
    },
];

/** @type {Item[]} */
export const countableList = [
    {
        id: "wattCount",
        itemPool: 1,
        state: 0,
        pics: [require("./assets/pic/sample-icons/partners/watt.png")],
        max: 3,
    },
    {
        id: "bowCount",
        itemPool: 1,
        state: 0,
        pics: [require("./assets/pic/sample-icons/partners/bow.png")],
        max: 12,
    },
];
