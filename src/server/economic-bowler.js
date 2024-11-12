let path = require('path');
let deleiveriesData = require(path.join(__dirname,'..','data','deliveries.json'));
let matchesData = require(path.join(__dirname,'..','data','matchesPerYear.json'));

const fs = require('fs');
// Top 10 economical bowlers in the year 2015

function economicBowlersSpecificYear(year) {
    let matchIdsSpecificYear = matchesData.filter((match) => match.season === year)
        .map((match) => match.id)

    // return matchIdsSpecificYear

    let bowlers = deleiveriesData.reduce((acc,delivery)=>{
        let id = delivery.match_id;
        let bowler = delivery.bowler;
        let runs = Number(delivery.wide_runs) +
            Number(delivery.noball_runs) +
            Number(delivery.batsman_runs);
        if (matchIdsSpecificYear.includes(id)) {
            if(!acc.hasOwnProperty(bowler)){
                acc[bowler] = {runs: 0, balls : 0}
            }
            acc[bowler].runs += runs;
            acc[bowler].balls += 1;
        }
        return acc
    },{})
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

fs.writeFileSync(path.join(__dirname,'..','public','output','economicBowlersSpecificYear.json'), jsonResult);
