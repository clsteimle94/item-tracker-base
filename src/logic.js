export let trackerMap = new Map();

export function updateMap(trackerState) {
    trackerState.upgrades.forEach(element => {
        trackerMap.set(element.id, element.state);
    });

    trackerState.partners.forEach(element => {
        trackerMap.set(element.id, element.state);
    });

    trackerState.counters.forEach(element => {
        trackerMap.set(element.id, element.state);
    });

    trackerState.countables.forEach(element => {
        trackerMap.set(element.id, element.state);
    });
}

export function updateItem(element) {
    trackerMap.set(element.id, element.state);
}


export function updateLogic() {
    ch1Check();
}


export function ch1Check() {
    const requirements = ["kooper", "bombette"];
    logicCheck("ch1Check", requirements);
}


export function logicCheck(elemId, requirements) {
    let flag = true;
    let elem = document.getElementById(elemId);
    
    for (let i = 0; i < requirements.length; i++) {
        if ( !trackerMap.get(requirements[i]) ) flag = false;  
    }

    if (flag) {
        elem.innerHTML = "Yes";
        elem.style.color = "darkgreen";
    }
    else {
        elem.innerHTML = "No";
        elem.style.color = "darkred";
    }
}