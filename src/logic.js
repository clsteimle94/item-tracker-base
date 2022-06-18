export let trackerState = {
    "tracker" : new Map(),
};

export function loadTrackerState(counters, partners, upgrades) {
    for (const [key, value] of Object.entries(partners)) {
        key;
        trackerState.tracker.set(value.id, value.state);
    }
    for (const [key, value] of Object.entries(counters)) {
        key;
        trackerState.tracker.set(value.id, value.state);
    }

    for (const [key, value] of Object.entries(upgrades)) {
        key;
        trackerState.tracker.set(value.id, value.state);
    }
    ch1Check();
}

export function updateTrackerItem(item) {
    trackerState.tracker.set(item.id, item.state);
    //console.log(item.id + ": " + item.state);
    ch1Check();
}

export function ch1Check() {
    if ( trackerState.tracker.get("kooper") ) document.getElementById("ch1Check").innerHTML = "Yes";
    else  document.getElementById("ch1Check").innerHTML = "No";
    console.log("kooper: " + trackerState.tracker.get("kooper"));
}