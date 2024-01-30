(async  () => {

     const database = require('./maindb');
     const Weather = require('./weatherdb')
     await database.sync();

})();