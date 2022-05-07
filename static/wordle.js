// Information:
// _: no letter
// k: known letter
// l: located letter
let information = "_________________________".split("");

function cycleinfo (i) {
    information[i] === "_" ? information[i] = "k" :
        information[i] === "k" ? information[i] = "l" :
        information[i] = "_";
    updatewordlist();
}

function updatewordlist () {
    let letters = inputbox.value.toUpperCase();
    let boxes = [letter0, letter1, letter2, letter3, letter4,
                 letter5, letter6, letter7, letter8, letter9,
                 letter10, letter11, letter12, letter13, letter14,
                 letter15, letter16, letter17, letter18, letter19,
                 letter20, letter21, letter22, letter23, letter24];
    boxes.map(l => l.innerText = "");
    for (let i=0; i<letters.length; i++) {
        boxes[i].innerText = letters[i];
    }
    
    let output = wordlist.map(word => word.toUpperCase());

    let notletters = [];
    let knownletters = [];
    let locatedletters = [];
    for (let i=0; i<information.length; i++) {
        if (information[i] === "_") {
            notletters.push(i);
        } else if (information[i] === "k") {
            knownletters.push(i);
        } else {
            locatedletters.push(i);
        }
    }
    notletters = notletters.map(i => letters[i]);
    let knownlocations = knownletters.map(n => n % 5);
    knownletters = knownletters.map(i => letters[i]);
    let locatedlocations = locatedletters.map(n => n % 5);
    locatedletters = locatedletters.map(i => letters[i]);

    let intersection = notletters.filter(value => knownletters.includes(value));
    notletters = notletters.filter(value => intersection.includes(value) === false);
    intersection = locatedletters.filter(value => locatedletters.includes(value));
    notletters = notletters.filter(value => intersection.includes(value) === false);

    for (let i=0; i<locatedlocations.length; i++) {
        output = output.filter(w => w[locatedlocations[i]] === locatedletters[i]);
    }

    for (let i=0; i<knownlocations.length; i++) {
        output = output.filter(w => w[knownlocations[i]] !== knownletters[i]);
    }


    for (let i=0; i<notletters.length; i++) {
        output = output.filter(w => w.indexOf(notletters[i]) === -1 ? true : false);
    }

    for (let i=0; i<knownletters.length; i++) {
        output = output.filter(w => w.indexOf(knownletters[i]) !== -1 ? true : false);
    }

    possiblewords.innerHTML = `<div class="candidate"> ${output.join('</div><div class="candidate">')} </div>`;
    updateclasses();
    return output;
}

function updateclasses () {
    let nletters = inputbox.value.length;
    let boxes = [letter0, letter1, letter2, letter3, letter4,
                 letter5, letter6, letter7, letter8, letter9,
                 letter10, letter11, letter12, letter13, letter14,
                 letter15, letter16, letter17, letter18, letter19,
                 letter20, letter21, letter22, letter23, letter24];
    for (let i=0; i<information.length; i++) {
        if (i > nletters-1) {
            boxes[i].classList = "letter blank";
            information[i] = "_";
        } else if (information[i] === "_") {
            boxes[i].classList = "letter not";
        } else if (information[i] === "k") {
            boxes[i].classList = "letter known";
        } else {
            boxes[i].classList = "letter located";
        }
    }
}
