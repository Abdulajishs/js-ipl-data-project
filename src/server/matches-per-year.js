const path = require('path');
const matchesData = require(path.join(__dirname,'..','data','matchesPerYear.json'))

const fs = require('fs');
// Number of matches played per year for all the years in IPL.

function matchesPerYear(matchesData) {
    let matchesplayed = matchesData.reduce((acc,match)=>{
        let season = match.season;
        if(acc.hasOwnProperty(season)){
            acc[season] += 1;
        }else{
            acc[season] = 1
        }
        return acc
    },{})
    return matchesplayed
}
let result = matchesPerYear(matchesData);
console.log(result);

const jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync(path.join(__dirname,'..','public','output','matchesPlayedPerYear.json'), jsonResult);
