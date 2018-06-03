let fs = require('fs'),
    file = 'config.json';
let mongoose = require('mongoose');
const path = require('path')
mongoose.Promise = global.Promise;

const {mongoLink, mongoUser, mongoPassword} = 
  JSON.parse(fs.readFileSync(path.resolve(__dirname, `../${file}`)))

module.exports = function (callback) {
  return new Promise((resolve, reject) => {
    const dbUrl  = `mongodb://${mongoUser}:${mongoPassword}@${mongoLink}`
    const db = mongoose.createConnection(dbUrl)
    db.on('error', () => {
      db.close()
      reject('connection error')
    })
    db.once('open', () => {
      console.log('Conntected To Mongo Database')
      resolve(callback(db))
    });
  })
}
