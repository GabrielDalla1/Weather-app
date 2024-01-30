const Sequelize = require('sequelize');
const database = require('./maindb');

const Weather = database.define('weatherdb', {
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
    temperature: {
        type: Sequelize.STRING(60), 
    },
    feels_like: {
        type: Sequelize.STRING(60),
    },
    temp_min: {
        type: Sequelize.STRING(60),
    },
    temp_max: {
        type: Sequelize.STRING(60),
    },
    pressure: {
        type: Sequelize.STRING(60), 
    },
    humidity: {
        type: Sequelize.STRING(60),
    },
    visibility: {
        type: Sequelize.STRING(60),
    },
    wind_speed: {
        type: Sequelize.STRING(60),
    },
    rain_1h: {
        type: Sequelize.STRING(60),
    },
    clouds: {
        type: Sequelize.STRING(60),
    },
    sunrise_time: {
        type: Sequelize.STRING(60),
    },
    sunset_time: {
        type: Sequelize.STRING(60),
    },
    lon: {
        type: Sequelize.STRING(60),
    },
    lat: {
        type: Sequelize.STRING(60),
    },
    weather_id: {
        type: Sequelize.STRING(60),
    },
    weather_main: {
        type: Sequelize.STRING(60),
    },
    weather_description: {
        type: Sequelize.STRING(100),
    },
    weather_icon: {
        type: Sequelize.STRING(60),
    },
    base: {
        type: Sequelize.STRING(60),
    },
    sea_level: {
        type: Sequelize.STRING(60),
    },
    ground_level: {
        type: Sequelize.STRING(60),
    },
    wind_deg: {
        type: Sequelize.STRING(60),
    },
    wind_gust: {
        type: Sequelize.STRING(60),
    },
    dt: {
        type: Sequelize.STRING(60),
    },
    sys_type: {
        type: Sequelize.STRING(60),
    },
    sys_id: {
        type: Sequelize.STRING(60),
    }
});


module.exports = Weather;