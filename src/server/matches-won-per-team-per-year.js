let matchesData = require('/home/abdul/Desktop/IPL/src/public/output/matchesPerYear.json')
const fs = require('fs');

// Number of matches won per team per year in IPL.

function matchWonPerTeamPerYear(matchesData) {
    let result = {}
    for (let i = 0; i < matchesData.length; i++) {
        let season = matchesData[i].season;
        let winner = matchesData[i].winner;
            if(!result.hasOwnProperty(season) ){
                result[season] = {}
            }
            if(result[season][winner]){
                result[season][winner] += 1
            }else{
                result[season][winner] = 1;
            }
    }
    return result
}

let result = matchWonPerTeamPerYear(matchesData);
console.log(result);

const jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync('/home/abdul/Desktop/IPL/src/public/output/matchWonPerTeamPerYear.json', jsonResult);