//você deve rodar esse arquivo ao na terminal para realizar a criação do banco de dados
(async () => {

         const webhookDB = require('./whdb');
         const Webhooks = require('./definewhdb')
         await webhookDB.sync();

})();