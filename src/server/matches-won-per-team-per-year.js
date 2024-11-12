let path = require('path');
let matchesData = require(path.join(__dirname,'..','data','matchesPerYear.json'))


const fs = require('fs');

// Number of matches won per team per year in IPL.

function matchWonPerTeamPerYear(matchesData) {

    let result = matchesData.reduce((acc, match) => {
        let season = match.season;
        let winner = match.winner;
        if (!acc.hasOwnProperty(season)) {
            acc[season] = {}
        }
        if (acc[season][winner]) {
            acc[season][winner] += 1
        } else {
            acc[season][winner] = 1;
        }
        return acc
    }, {})
    return result
}

let result = matchWonPerTeamPerYear(matchesData);
console.log(result);

const jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync(path.join(__dirname,'..','public','output','matchWonPerTeamPerYear.json') ,jsonResult);