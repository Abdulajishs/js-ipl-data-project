const path = require('path');
let deleiveriesData = require(path.join(__dirname,'..','data','deliveries.json'));
let fs = require('fs');

// Find the highest number of times one player has been dismissed by another player

// "dismissal_kind": "run out"

function highestDismissalByBowler() {
    let dismissals = {};
    deleiveriesData.forEach(delivery => {
        let batsman = delivery.batsman;
        let bowler = delivery.bowler;
        if (delivery.dismissal_kind !== 'run out' &&
            delivery.dismissal_kind !== ''
        ) {
            if (!dismissals.hasOwnProperty(batsman)) {
                dismissals[batsman] = {}
            }
            if (!dismissals[batsman].hasOwnProperty(bowler)) {
                dismissals[batsman][bowler] = { dismissed: 0 }
            }
            dismissals[batsman][bowler].dismissed += 1
        }
    });
    // return dismissals
    let highestDismissal = {bowler : '', batsman : '', count : 0};
    for (const bowler in dismissals) {
        for (const batsman in dismissals[bowler]) {
            let count = dismissals[bowler][batsman].dismissed;
            if(count > highestDismissal.count){
                highestDismissal.bowler = bowler;
                highestDismissal.batsman = batsman;
                highestDismissal.count = count;
            }
        }
    }
    return highestDismissal



}


let result = highestDismissalByBowler();
console.log(result);

const jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync(path.join(__dirname,'..','public','output','highestDismissalByBowler.json'), jsonResult);

