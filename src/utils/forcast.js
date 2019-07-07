const request = require('request');

const forcast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/07fdf7d8c3bb6dceb4cb03b325aa0d7c/${latitude},${longitude}`;
    
    request({url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to network.', undefined);
        } else if (response.body.error) {
            callback('Unable to connect to forcast network.', undefined);
        } else {
            const currently = response.body.currently;
            const daily = response.body.daily.data[0];
            const result = `${daily.summary}<br/>
                            It is currently ${currently.temperature} degrees out. The highest will be ${daily.temperatureHigh} with low as ${daily.temperatureLow}.<br/>
                            There is a ${currently.precipProbability}% chance of rain.`
            callback(undefined, result);
        }
    })
}

module.exports = forcast;