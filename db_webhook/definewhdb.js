const Sequelize = require('sequelize');
const webhookDB = require('./whdb');

//criação do modelo da tabela webhooks
const Webhooks = webhookDB.define('webhooks', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    city_name: {
        type: Sequelize.STRING(60),
    },
    country: {
        type: Sequelize.STRING(60),
    },
    webhookUrl: {
        type: Sequelize.STRING(120),
    },
});


module.exports = Webhooks;