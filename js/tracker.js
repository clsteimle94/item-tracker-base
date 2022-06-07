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
const upgradeList = [
    {id: "boots", itemPool: 3, state: 1, pics: ["upgrades/boots1.png", "upgrades/boots2.png", "upgrades/boots3.png"]},
    {id: "hammer", itemPool: 3, state: 1, pics: ["upgrades/hammer1.png", "upgrades/hammer2.png", "upgrades/hammer3.png"]},
    {id: "ultrastone", itemPool: 1, state: 0, pics: ["upgrades/ultrastone.png"]},
];

/** @type {Item[]} */
const partnerList = [
    {id: "goombario", itemPool: 1, state: 0, pics: ["partners/goombario.png"]},
    {id: "kooper", itemPool: 1, state: 0, pics: ["partners/kooper.png"]},
    {id: "bombette", itemPool: 1, state: 0, pics: ["partners/bombette.png"]},
    {id: "parakarry", itemPool: 1, state: 0, pics: ["partners/parakarry.png"]},
    {id: "bow", itemPool: 1, state: 0, pics: ["partners/bow.png"]},
    {id: "watt", itemPool: 1, state: 0, pics: ["partners/watt.png"]},
    {id: "sushi", itemPool: 1, state: 0, pics: ["partners/sushi.png"]},
    {id: "lukister", itemPool: 1, state: 0, pics: ["partners/lukister.png"]},
];

// Initialize globals
const picLibrary = 'pic/sample-icons/';
/** @type {Item[]} */
let items = [];
let counters = {};

// DOM References.
const loadButton = document.getElementById('loadBtn');
const saveButton = document.getElementById('saveBtn');
const saveToFileButton = document.getElementById('saveFile');
/** @type {HTMLInputElement} */
const fileInput = document.getElementById('fileToLoad');

/**
 * @param {Item} item
 * @param {string} groupId
 */
function createItem(item, groupId) {
     // account for single pictures + lack of 'off' pictures
    if (item.pics.length == item.itemPool) {
        item.pics.unshift(item.pics[0]);
    }

    items.push(item);

    const newDiv = document.createElement('div');

    newDiv.id = item.id;
    newDiv.classList.add('grid-item');
    newDiv.addEventListener('mousedown', (e) => {
        toggle(item, isRightClick(e));
    });
    newDiv.style.backgroundImage = picPath(item);

    if (item.state == 0) uncheck(newDiv);

    document.getElementById(groupId).appendChild(newDiv);
}

/**
 * @param {Item[]} list
 * @param {string} groupId
 */
function createGroup(list, groupId){
    list.forEach((item) => {
        createItem(item, groupId);
    });
}

/**
 * @param {Item} item
 * @return {string}
 */
function picPath(item) {
    return `url('${picLibrary}${item.pics[item.state]}')`;
}

/**
 * @param {Item} item
 * @param {boolean} isRightCLick
 */
function toggle(item, isRightCLick) {
    if (isRightCLick) {
        if (item.state == 0) item.state = item.itemPool;
        else item.state--;
    }
    else {
        if (item.state == item.itemPool) item.state = 0;
        else item.state++;
    }

    const elem = document.getElementById(item.id);
    
    if (item.state == 0) uncheck(elem);
    else check(elem);

    elem.style.backgroundImage = picPath(item);
}

/**
 * @param {HTMLElement} elem
 */
function uncheck(elem) {
    elem.style.filter = 'grayscale(90%)';
    elem.style.opacity = '0.4';
}

/**
 * @param {HTMLElement} elem
 */
function check(elem) {
    elem.style.filter = 'grayscale(0%)';
    elem.style.opacity = '1.0';
}

/**
 * @param {string} id
 * @param {number} startVal
 * @param {number} deltaVal
 * @param {string} groupID
 */
function createCounter(id,startVal,deltaVal,groupID){
    const newDiv = document.createElement('div');

    newDiv.id = id;
    newDiv.classList.add('counter');
    newDiv.addEventListener('mousedown', (e) => {
        counter(newDiv, deltaVal, isRightClick(e));
    });
    newDiv.innerHTML = startVal;

    counter(newDiv, 0); // iniitialize counter color
    counters[id] = startVal;
    document.getElementById(groupID).appendChild(newDiv);
}

/**
 * @param {HTMLElement} elem
 * @param {number} val
 * @param {boolean} isRightClick
 */
function counter(elem, val, isRightClick) {
    let value = parseInt(elem.innerHTML);

    if (isRightClick) value -= val;
    else value += val;

    const max = 10;
    const min = 0;

    if (value > min && value < max) {
        elem.style.color = 'black'; 
    }
    else if (value >= max) {
        value = max;
        elem.style.color = 'lightgreen';
    }
    else if (value <= min) {
        value = min;
        elem.style.color = 'darkred';
    }

    counters[elem.id] = value;
    elem.innerHTML = value;
}

/**
 * @param {MouseEvent} e
 * @return {boolean}
 */
function isRightClick(e) {
    if ('which' in e)  // Gecko (Firefox), WebKit (Safari/Chrome) & Opera
        return e.which == 3; 
    else if ('button' in e)  // IE, Opera 
        return e.button == 2; 

    return false
}

function drawAll() {
    items.forEach((item) => {
        const pic = `url('${picLibrary}${item.pics[item.state]}')`;
        const elem = document.getElementById(item.id);

        if (item.state == 0) uncheck(elem);
        else check(elem);
        elem.style.backgroundImage = pic;
    });

    Object.keys(counters).forEach((key) => {
        const counterEl = document.getElementById(key);
        counterEl.innerHTML = counters[key];
        counter(counterEl, 0);
    });
}

/**
 * @param {string} json
 */
function jsonToState(json) {
    const saveObj = JSON.parse(json);

    items = saveObj.items;
    counters = saveObj.counters;
}

/**
 * @return {string}
 */
function stateToJson() {
    return JSON.stringify({
        items,
        counters
    });
}

/**
 * @param {string} content
 * @param {string} fileName
 * @param {string} contentType
 */
function download(content, fileName, contentType) {
    const a = document.createElement('a');
    const file = new Blob([content], {type: contentType});

    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
}

// ---------- Event Handlers ---------- \\

saveButton.addEventListener('click', (e) => {
    localStorage.setItem('trackerBaseSave', stateToJson());
});

loadButton.addEventListener('click', (e) => {
    jsonToState(localStorage.getItem('trackerBaseSave'));

    drawAll();
});

saveToFileButton.addEventListener('click', (e) => {
    download(stateToJson(), 'trackerBaseSave.txt', 'text/plain');
});

fileInput.addEventListener('change', (e) => {
    const file = fileInput.files[0];

    if (file != null) {
        const fileReader = new FileReader();

        fileReader.onload = (e) => {
            const textFromFileLoaded = e.target.result;
            
            jsonToState(textFromFileLoaded);

            drawAll();
        };

        fileReader.readAsText(file, 'UTF-8');
        file.value = null;
    }
});

// Disables right-click menu
window.oncontextmenu = (e) => {
    return false;
};

// On Document Ready.
(() => {
    createGroup(upgradeList, "upgrades");
    createGroup(partnerList, "partners");
    createCounter("counter1", 0, 1, "counters");
})();