const request = require('postman-request')

const weatherStack = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=cab8b71d223ad3a50e7519b4d65afb54&query=' + latitude + ',' + longitude

    request({ url, json:true }, (error, { body }) => {
        if (error){
            callback('Unable to connect to weather service! ', undefined)
        }else if (body.error){
            callback('unable to find location! ', undefined)
        }else{
            callback(undefined, "The temperature is " + body.current.temperature + " and it feels like " + body.current.feelslike)
        }
    })
}
module.exports = weatherStack