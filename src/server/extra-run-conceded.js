let deleiveriesData = require('/home/abdul/Desktop/IPL/src/public/output/deliveries.json');
let matchesData = require('/home/abdul/Desktop/IPL/src/public/output/matchesPerYear.json')

let fs = require('fs');
// Extra runs conceded per team in the year 2016

function extraRunPerTeamSpecificYear(year) {
    let  matchIdsSpecificYear = [];
    matchesData.forEach((match)=>{
        let season = match.season;
        let id = match.id
        if(season === year ){
            if (!matchIdsSpecificYear.includes(id)) {
                matchIdsSpecificYear.push(id)
            }
        }
    })
    // return matchIdsSpecificYear
    let extraRuns = {};

    deleiveriesData.forEach((delivery)=>{
        let id = delivery.match_id;
        let extras = Number(delivery.extra_runs);
        let team = delivery.bowling_team;
        if(matchIdsSpecificYear.includes(id)){
            if(!extraRuns.hasOwnProperty(team)){
                console.log(team)
                extraRuns[team] = 0
            }
            extraRuns[team] += extras
        }
    })
    return extraRuns
}


let result = extraRunPerTeamSpecificYear('2016');
console.log(result);

const jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync('/home/abdul/Desktop/IPL/src/public/output/extraRunPerTeamSpecificYear.json', jsonResult);
