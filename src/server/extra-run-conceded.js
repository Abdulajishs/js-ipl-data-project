const path = require('path');
let deleiveriesData = require(path.join(__dirname,'..','data','deliveries.json'));
let matchesData = require(path.join(__dirname,'..','data','matchesPerYear.json'));

let fs = require('fs');
// Extra runs conceded per team in the year 2016

function extraRunPerTeamSpecificYear(year) {

    let matchIdsSpecificYear = matchesData.filter(match=>{
        return match.season === year
    }).map((match)=> match.id)
    // return matchIdsSpecificYear

    let extraRuns = deleiveriesData.reduce((acc,delivery)=>{
        let id = delivery.match_id;
        let extras = Number(delivery.extra_runs);
        let team = delivery.bowling_team;

        if (matchIdsSpecificYear.includes(id)) {
            if (!acc.hasOwnProperty(team)) {
                acc[team] = 0
            }
            acc[team] += extras
        }
        return acc
    },{})

    return extraRuns
}


let result = extraRunPerTeamSpecificYear('2016');
console.log(result);

const jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync(path.join(__dirname,'..','public','output','extraRunPerTeamSpecificYear.json'), jsonResult);
