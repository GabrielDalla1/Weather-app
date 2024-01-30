const webhookDB = require('./whdb');
const Webhooks = require('./definewhdb')


async function createWebhookData(city_name, country, webhookUrl) {
  
    await webhookDB.sync();
  
    const newWebhook = await Webhooks.create({
      city_name: city_name,
      country: country,
      webhookUrl: webhookUrl,
    });
  
    return newWebhook;
  }


  
//verifica se o city_name e country estão no banco de dados e envia o dados JSON para o webhook
async function webhookHistory(cityName, country){
    const filterWebhook = await Webhooks.findAll({
           where: {
               city_name: cityName,
               country: country,    
           }
      });
    
      return filterWebhook;
    }




module.exports = {
    createWebhookData,
    webhookHistory,
  };