const express = require('express');
const axios = require('axios');

const asyncdb = require('./db_connection/asyncdb');
const Weather = require('./db_connection/weatherdb');

const Webhooks = require('./db_webhook/definewhdb');
const WebhookFetch = require('./db_webhook/fetchwhdb');

const app = express();
app.use(express.urlencoded({ extended: false }));

require('dotenv').config();
const API_KEY = 'ab5169f86f9807d4da27185bbb7d7816';
const port = 3033;

/**
 * Endpoint: GET /weather
 * Descrição: Retorna informações meteorológicas para a cidade e país especificados.
 * Parâmetros:
 *   - city: Nome da cidade.
 *   - country: Código do país. (exemplo: Estados Unidos deve ser "USA").
 */

app.get('/weather', function(req, res){

  // Obtém os parâmetros da consulta
    const city = req.query.city;
    const country = req.query.country;

  // Constrói a URL da requisição à OpenWeatherMap API
    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&units=metric&appid=${API_KEY}`;

    
  // Faz a requisição à API usando Axios
    axios.get(requestUrl)
    .then(async response => {

    // Extrai os dados da resposta JSON da API
      const data = response.data;
      const cityName = data.name;

      const country = data.sys.country;

      const temperature = data.main.temp;
      const feelsLike = data.main.feels_like;
      const tempMin = data.main.temp_min;
      const tempMax = data.main.temp_max;
      const pressure = data.main.pressure;
      const humidity = data.main.humidity;

      const visibility = data.visibility;
      const windSpeed = data.wind.speed;
      const rain1h = data.rain ? data.rain['1h'] : 0;
      const clouds = data.clouds.all;

      const lon = data.coord.lon;
      const lat = data.coord.lat;
      const weatherId = data.weather[0].id;
      const weatherMain = data.weather[0].main;
      const weatherDescription = data.weather[0].description;
      const weatherIcon = data.weather[0].icon;
      const base = data.base;
      const seaLevel = data.main.sea_level;
      const groundLevel = data.main.grnd_level;
      const windDeg = data.wind.deg;
      const windGust = data.wind.gust;
      const dt = new Date(data.dt * 1000).toISOString();
      const sysType = data.sys.type;
      const sysId = data.sys.id;

      const sunriseTime = new Date(data.sys.sunrise * 1000).toLocaleTimeString();
      const sunsetTime = new Date(data.sys.sunset * 1000).toLocaleTimeString();
    
    
    //invoca a função para verificar se existe na tabela 'webhooks' o cityName e country
    const filterWebhook = await WebhookFetch.webhookHistory(cityName, country);

    if (filterWebhook.length > 0) {
      // Itera sobre cada webhook e envia os dados
      for (const webhook of filterWebhook) {
        const webhookUrl = webhook.dataValues.webhookUrl;

        
        try {
          await sendWeatherDataToWebhook(webhookUrl, data);
          console.log(`Weather data sent to webhook: ${webhookUrl}`);
        } catch (webhookError) {
          // Tratamento de erro ao enviar dados para webhook
          console.error(`Error sending data to webhook: ${webhookUrl}`, webhookError);
          // Continua o loop se um webhook falhar
        }
      }
    }

      // Função para enviar dados para a webhookUrl
       async function sendWeatherDataToWebhook(webhookUrl, weatherData) {
  
           await axios.post(webhookUrl, weatherData);

      }
             
    // Chama a função para criar os dados meteorológicos no banco de dados
      const newWeather = await asyncdb.createWeatherData(cityName, country, temperature, feelsLike, tempMin, tempMax, pressure, humidity, visibility, windSpeed, rain1h, clouds, lon, lat, weatherId, weatherMain, weatherDescription, weatherIcon, base, seaLevel, groundLevel, windDeg, windGust, dt, sysType, sysId, sunriseTime, sunsetTime);

// Gera uma mensagem formatada com os dados meteorológicos

  const message = `
    City Name: ${cityName}<br>
    Country: ${country}<br>
    Temperature: ${temperature}&deg;C<br>
    Feels Like: ${feelsLike}&deg;C<br>
    Min Temperature: ${tempMin}&deg;C<br>
    Max Temperature: ${tempMax}&deg;C<br>
    Pressure: ${pressure} hPa<br>
    Humidity: ${humidity}%<br>
    Visibility: ${visibility} meters<br>
    Wind Speed: ${windSpeed} m/s<br>
    Rain (1h): ${rain1h} mm<br>
    Cloudiness: ${clouds}%<br>
    Longitude: ${lon}<br>
    Latitude: ${lat}<br>
    Weather ID: ${weatherId}<br>
    Weather Main: ${weatherMain}<br>
    Weather Description: ${weatherDescription}<br>
    Weather Icon: ${weatherIcon}<br>
    Base: ${base}<br>
    Sea Level: ${seaLevel}<br>
    Ground Level: ${groundLevel}<br>
    Wind Degree: ${windDeg}<br>
    Wind Gust: ${windGust}<br>
    Datetime: ${dt}<br>
    System Type: ${sysType}<br>
    System ID: ${sysId}<br>
    Sunrise Time: ${sunriseTime}<br>
    Sunset Time: ${sunsetTime}
  `;
    
    // Envia a mensagem como resposta HTML com os dados formatados
      res.send(`<html><body><div id='container'><h1>${message}</h1></div></body></html>`);
  
     // console.log(data);
    })
    .catch(error => {
    // Trata erros de requisição à API
      console.error(error);
      res.status(500).send('Error occurred while fetching weather data. Please check the city and country parameters.');
    });

});


/**
 * Endpoint: GET /history
 * Descrição: Retorna histórico de informações meteorológicas para a cidade e país especificados em consultas anteriores.
 * Exemplo de retorno (JSON):
 *  [
 *    {
 *       "city": "",
 *       "country": "",
 *       "requestDate": "",
 *       "weatherData": {}
 *    }
 *  ]

 */

app.get('/history', async function(req, res){

  try {
    //passa o valor da função que obtém os valores através de query pelo MySQL
    const historyWeather = await asyncdb.getHistory();
    
    // Enviar a resposta como JSON
    res.json(historyWeather);
  } catch (error) {
    console.error('Error while obtaining historic', error);
    res.status(500).json({ error: 'Internal error while obtaining historic'});
  }
});


/**
 * Endpoint: POST /webhook
 * Descrição: Configura webhooks para cidades específicas.
 * Corpo da Solicitação:
 *   - city_name: Nome da cidade.
 *   - country: Código do país. (exemplo: Estados Unidos deve ser "USA").
 *   - webhookURL: URL do webhook.
 */

app.post('/webhook', async function(req, res) {
  try {
    let city_name = req.body.city_name;
    let country = req.body.country;
    let webhookUrl = req.body.webhookUrl;

    // Supondo que a função createWebhookData retorne uma Promise, você pode esperar por ela
    await WebhookFetch.createWebhookData(city_name, country, webhookUrl);

    // Envie uma resposta de sucesso com status 200
    res.status(200).send("Operation completed successfully");
  } catch (error) {
    // Em caso de erro, envie uma resposta de erro com status 500
    console.error(error);
    res.status(500).send("An error occurred during the operation");
  }
});

// Inicia o servidor na porta especificada
app.listen(port, function() {
    console.log(`App is running on ${port}`);
});