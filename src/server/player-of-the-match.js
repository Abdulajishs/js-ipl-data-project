let matchesData = require('/home/abdul/Desktop/IPL/src/public/output/matchesPerYear.json')

let fs = require('fs');

// Find a player who has won the highest number of Player of the
//  Match awards for each season

function highestPlayerOfTheMatch() {
    let pom = {}
    matchesData.forEach(match => {
        let season = match.season;
        let player = match.player_of_match;
        if(!pom.hasOwnProperty(season)){
            pom[season] = {};
        }
        if (!pom[season].hasOwnProperty(player)) {
            pom[season][player] = 0
        }
        pom[season][player] += 1
    });
    // return pom
    let highestPlayers = {};
    for (const season in pom) {
        let players = pom[season];
        let max = 0;
        let highestPlayer = '';
        for(let player in players){
            let count = players[player];
            if(count > max){
                max = count;
                highestPlayer = player;
            }
        }
        highestPlayers[season]=highestPlayer;
    }
    return highestPlayers
}


let result = highestPlayerOfTheMatch();
console.log(result);

const jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync('/home/abdul/Desktop/IPL/src/public/output/highestPlayerOfTheMatch.json', jsonResult);

