const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/7bddc510686f1a94ade24f97c9d71e04/' + latitude + ',' + longitude

    request({ url, json: true }, (error, result) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (result.body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,result.body.daily.data[0].summary + ' It is currently ' + result.body.currently.temperature + ' degress out. There is a ' + result.body.currently.precipProbability + '% chance of rain.')
        }
    })
}

module.exports = forecast