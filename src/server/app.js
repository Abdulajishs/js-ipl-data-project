const csv = require('csvtojson');
const fs = require('fs');

csv()
  .fromFile("/home/abdul/Desktop/IPL/src/data/matches.csv")
  .then((jsonObj) => {
    fs.writeFileSync('../data/matchesPerYear.json', JSON.stringify(jsonObj, null, 2));
  })
  .catch((err) => {
    console.log('Error processing matches.csv:', err)
  })


csv()
  .fromFile("/home/abdul/Desktop/IPL/src/data/deliveries.csv")
  .then((jsonObj) => {
    fs.writeFileSync('../data/deliveries.json', JSON.stringify(jsonObj, null, 2));
  })
  .catch((err) => {
    console.log('Error processing matches.csv:', err)
  })