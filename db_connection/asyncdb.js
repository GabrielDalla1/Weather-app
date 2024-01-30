const database = require('./maindb');
const Weather = require('./weatherdb');

/**
 * Função responsável por inserir os dados no DataBase
 */

async function createWeatherData(cityName, country, temperature, feelsLike, tempMin, tempMax, pressure, humidity, visibility, windSpeed, rain1h, clouds, lon, lat, weatherId, weatherMain, weatherDescription, weatherIcon, base, seaLevel, groundLevel, windDeg, windGust, dt, sysType, sysId, sunriseTime, sunsetTime) {
  
  await database.sync();

  const newWeather = await Weather.create({
    city_name: cityName,
    country: country,
    temperature: temperature,
    feels_like: feelsLike,
    temp_min: tempMin,
    temp_max: tempMax,
    pressure: pressure,
    humidity: humidity,
    visibility: visibility,
    wind_speed: windSpeed,
    rain_1h: rain1h,
    clouds: clouds,
    lon: lon,
    lat: lat,
    weather_id: weatherId,
    weather_main: weatherMain,
    weather_description: weatherDescription,
    weather_icon: weatherIcon,
    base: base,
    sea_level: seaLevel,
    ground_level: groundLevel,
    wind_deg: windDeg,
    wind_gust: windGust,
    dt: dt,
    sys_type: sysType,
    sys_id: sysId,
    sunrise_time: sunriseTime,
    sunset_time: sunsetTime,
  });

  return newWeather;
}

/**
 * Função responsável por consultar todos os dados no DataBase
 */

async function getHistory(){
  await database.sync();

  const historyWeather = await Weather.findAll({

  });
   
return convertToObject(historyWeather);

}

/**
 * Função responsável por alterar o formato do date do 'createdAt'
 */

function formatCreatedAt(createdAt) {
  return new Date(createdAt).toLocaleString('br-PT', { timeZone: 'UTC' });
}


/**
 * Função responsável por converter os dados do banco de dados em JSON no endpoint
 */

function convertToObject(historyWeather){
  const result = historyWeather.map(history => ({
    city: history.dataValues.city_name,
    country: history.dataValues.country,
    requestDate: formatCreatedAt(history.dataValues.createdAt),
    weatherData: {
      temperature: history.dataValues.temperature,
      feels_like: history.dataValues.feels_like,
      temp_min: history.dataValues.temp_min,
      temp_max: history.dataValues.temp_max,
      pressure: history.dataValues.pressure,
      humidity: history.dataValues.humidity,
      visibility: history.dataValues.visibility,
      wind_speed: history.dataValues.wind_speed,
      rain_1h: history.dataValues.rain_1h,
      clouds: history.dataValues.clouds,
      sunrise_time: history.dataValues.sunrise_time,
      sunset_time: history.dataValues.sunset_time,

      lon: history.dataValues.lon,
      lat: history.dataValues.lat,
      weather_id: history.dataValues.weather_id,
      weather_main: history.dataValues.weather_main,
      weather_description: history.dataValues.weather_description,
      weather_icon: history.dataValues.weather_icon,
      base: history.dataValues.base,
      sea_level: history.dataValues.sea_level,
      ground_level: history.dataValues.ground_level,
      wind_deg: history.dataValues.wind_deg,
      wind_gust: history.dataValues.wind_gust,
      dt: history.dataValues.dt,
      sys_type: history.dataValues.sys_type,
      sys_id: history.dataValues.sys_id,

      createdAt: formatCreatedAt(history.dataValues.createdAt),
      updatedAt: formatCreatedAt(history.dataValues.updatedAt),
    }
  }));
  
  return result;
}

module.exports = {
  createWeatherData,
  getHistory,
  convertToObject,
  formatCreatedAt,
};
