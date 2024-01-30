
//esse arquivo declara a criação e conexão com o banco de dados
const Sequelize = require('sequelize');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

/*
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
*/

//abaixo por parâmetro deve ser passado o banco de dados onde vai ser criado as tabelas, user e senha seguido de informações
const sequelize = new Sequelize('weather', 'root', 'password', {
       dialect: 'mysql',
       host: 'my-mysql',
       port: 3306
});

module.exports = sequelize;