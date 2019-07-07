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
            callback(undefined, `${response.body.daily.data[0].summary} It is currently ${currently.temperature} degrees out. There is a ${currently.precipProbability}% chance of rain.`);
        }
    })
}

module.exports = forcast;