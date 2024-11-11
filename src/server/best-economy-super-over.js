let deleiveriesData = require('/home/abdul/Desktop/IPL/src/public/output/deliveries.json');

let fs = require('fs');
// Find the bowler with the best economyBowlers in super overs

function besteconomyBowlersInSuperOver() {
    let economyBowlers = {}
    deleiveriesData.forEach(delivery => {
        if (delivery.is_super_over === "1") {
            let bowler = delivery.bowler;
            let runs = Number(delivery.wide_runs) +
                Number(delivery.noball_runs) +
                Number(delivery.batsman_runs);
            let ball = null;
            if (delivery.wide_runs === '0' && delivery.noball_runs === '0') {
                ball = 1
            } else {
                ball = 0;
            }

            if(!economyBowlers.hasOwnProperty(bowler)){
                economyBowlers[bowler] = {runs : 0, balls : 0}
            }

            economyBowlers[bowler].runs += runs;
            economyBowlers[bowler].balls += ball;
        }
    });
    // return economyBowlers

    for (const bowler in economyBowlers) {
        let run = economyBowlers[bowler].runs;
        let ball  = economyBowlers[bowler].balls;
        let over = ball/6;
        let economy = run/over;
        economyBowlers[bowler] = economy;
    }

    // return economyBowlers
    let bestBowler = "";
    let min = Infinity;
    for (const bowler in economyBowlers) {
        let economy = Number(economyBowlers[bowler]);
        if(economy < min){
            bestBowler = bowler;
            min = economy;
        }
    }
    return bestBowler;
}


let result = besteconomyBowlersInSuperOver('2015');
console.log(result);

const jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync('/home/abdul/Desktop/IPL/src/public/output/besteconomyBowlersInSuperOver.json', jsonResult);

