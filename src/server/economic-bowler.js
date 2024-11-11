let deleiveriesData = require('/home/abdul/Desktop/IPL/src/public/output/deliveries.json');
let matchesData = require('/home/abdul/Desktop/IPL/src/public/output/matchesPerYear.json')

const fs = require('fs');
// Top 10 economical bowlers in the year 2015

function economicBowlersSpecificYear(year) {
    let matchIdsSpecificYear = [];
    matchesData.forEach(match => {
        let season = match.season;
        let id = match.id;
        if (season === year) {
            matchIdsSpecificYear.push(id)
        }
    });
    // return matchIdsSpecificYear
    let bowlers = {}
    deleiveriesData.forEach((delivery) => {
        let id = delivery.match_id;
        let bowler = delivery.bowler;
        let runs = Number(delivery.wide_runs) +
            Number(delivery.noball_runs) +
            Number(delivery.batsman_runs);
        if (matchIdsSpecificYear.includes(id)) {
            if(!bowlers.hasOwnProperty(bowler)){
                bowlers[bowler] = {runs: 0, balls : 0}
            }
            bowlers[bowler].runs += runs;
            bowlers[bowler].balls += 1;
        }
        
    })
    // return bowlers
    let economy = []
    for (const key in bowlers) {
        let totalBalls = bowlers[key].balls;
        let overBowled = totalBalls / 6;
        let economyRate = (bowlers[key].runs / overBowled).toFixed(2);
        economy.push([key,economyRate])
    }
    let sort = economy.sort((a,b)=> a[1]-b[1]);

    return sort.slice(0,10)
}



let result = economicBowlersSpecificYear('2015');
console.log(result);

const jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync('/home/abdul/Desktop/IPL/src/public/output/economicBowlersSpecificYear.json', jsonResult);

