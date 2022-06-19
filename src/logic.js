export let trackerState = {
    "tracker" : new Map(),
};

export function loadTrackerState(counters, partners, upgrades) {
    for (const [key, value] of Object.entries(partners)) {
        trackerState.tracker.set(value.id, value.state); key;
    }
    for (const [key, value] of Object.entries(counters)) {
        trackerState.tracker.set(value.id, value.state); key;
    }

    for (const [key, value] of Object.entries(upgrades)) {
        trackerState.tracker.set(value.id, value.state); key;
    }
    ch1Check();
}

export function updateTrackerItem(item) {
    trackerState.tracker.set(item.id, item.state);
    //console.log(item.id + ": " + item.state);
    ch1Check();
}

export function ch1Check() {
    const requirements = ["kooper", "bombette"];
    let flag = true;
    
    for (let i = 0; i < requirements.length; i++) {
        if ( !trackerState.tracker.get(requirements[i]) ) flag = false;
    }

    if (flag) document.getElementById("ch1Check").innerHTML = "Yes";
    else  document.getElementById("ch1Check").innerHTML = "No";
}