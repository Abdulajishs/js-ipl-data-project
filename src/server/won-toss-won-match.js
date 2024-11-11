let matchesData = require('/home/abdul/Desktop/IPL/src/public/output/matchesPerYear.json');

let fs = require('fs')

// Find the number of times each team won the toss and also won the match

function tossWinMatchWin() {
    let teams = {};
    matchesData.forEach((match)=>{
        let tossWin = match.toss_winner;
        let matchWin = match.winner;
        if(tossWin == matchWin){
            if(!teams.hasOwnProperty(tossWin)){
                teams[tossWin] = 0;
            }
            teams[tossWin] += 1;
        }
    })
    return teams
}


let result = tossWinMatchWin();
console.log(result);

const jsonResult = JSON.stringify(result, null, 2);

fs.writeFileSync('/home/abdul/Desktop/IPL/src/public/output/tossWinMatchWin.json', jsonResult);

