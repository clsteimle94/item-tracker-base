export let trackerState = {
    "tracker" : new Map(),
};

export function loadTrackerState(partners,upgrades,counters,countables) {
    partners.forEach((value) => {
        trackerState.tracker.set(value.id, value.state);
    });

    upgrades.forEach((value) => {
        trackerState.tracker.set(value.id, value.state);
    });

    trackerState.tracker.set("counter1", counters.counter1);

    countables.forEach((value) => {
        trackerState.tracker.set(value.id, value.state);
    });

    ch1Check();
}

export function updateTrackerItem(item) {
    trackerState.tracker.set(item.id, item.state);
    // console.log(item.id, item.state);
    ch1Check();
}

export function logicCheck(requirements) {
    let flag = true;
    let elem = document.getElementById("ch1Check")
    
    for (let i = 0; i < requirements.length; i++) {
        if ( !trackerState.tracker.get(requirements[i]) ) flag = false;  
    }

    if (flag) {
        elem.innerHTML = "Yes";
        elem.style.color = "darkgreen";
        
    }
    else {
        elem.innerHTML = "No";
        elem.style.color = "darkred";
        
    }

    // console.log(trackerState.tracker);
}

export function ch1Check() {
    const requirements = ["kooper", "bombette"];
    logicCheck(requirements);
}