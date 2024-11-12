const path = require('path');
let matchesData = require(path.join(__dirname,'..','data','matchesPerYear.json'));
let deleiveriesData = require(path.join(__dirname,'..','data','deliveries.json'));

// let deleiveriesData = require("../data/deliveries.json")


let fs = require('fs');

// Find the strike rate of a batsman for each season

function strikeRateOfBatsmanForEachSeason() {
    let seasonId = {};
    matchesData.forEach(match => {
        let id = match.id;
        let season = match.season;
        if(!seasonId.hasOwnProperty(season)){
            seasonId[season] = []
        }
        seasonId[season].push(id)
    }); 
    // return seasonId
    let striker = {}
    deleiveriesData.forEach(delivery=>{
        let id = delivery.match_id;
        let batsmanRuns = Number(delivery.batsman_runs);
        let player = delivery.batsman;
        let wide = Number(delivery.wide_runs)
        let noball = Number(delivery.noball_runs)
        let isValidBall =  wide === 0 && noball === 0;
        for(let season in seasonId){
            if(seasonId[season].includes(id)){
                if (!striker.hasOwnProperty(season)) {
                    striker[season] = {}
                }
                if(!striker[season].hasOwnProperty(player)){
                    striker[season][player] =  {runs: 0, balls: 0}
                }
                // console.log(batsmanRuns)
                // console.log('before',striker[season])
                striker[season][player].runs += batsmanRuns;
                if(isValidBall){
                striker[season][player].balls += 1;
                }
                // console.log( 'after',striker[season])
            }
        }
    })
    // return striker
    for (const season in striker) {
        for (const player in striker[season]) {
            let playerStat = striker[season][player]
            let strikeRate = (playerStat.runs / playerStat.balls)*100;
            striker[season][player] = strikeRate
        }
    }
    return striker
}


let result = strikeRateOfBatsmanForEachSeason();
console.log(result);

const jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync(path.join(__dirname,'..','public','output','strikeRateOfBatsmanForEachSeason.json'), jsonResult);

