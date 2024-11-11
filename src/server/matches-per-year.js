const matchesData = require("/home/abdul/Desktop/IPL/src/public/output/matchesPerYear.json");

const fs = require('fs');
// Number of matches played per year for all the years in IPL.

function matchesPerYear(matchesData) {
    let matchesplayed = {};
    for (let i = 0; i < matchesData.length; i++) {
        for (const key in matchesData[i]) {
            if (key === 'season') {
                if (matchesplayed.hasOwnProperty(matchesData[i].season)) {
                    matchesplayed[matchesData[i].season] += 1
                } else {
                    let year = matchesData[i].season
                    matchesplayed[year] = 1
                }
            }
        }
    }
    return matchesplayed
}
let result = matchesPerYear(matchesData);
console.log(result);

const jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync('/home/abdul/Desktop/IPL/src/public/output/matchesPlayedPerYear.json', jsonResult);
