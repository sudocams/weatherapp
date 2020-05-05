const request = require('request')


const forecast = (lat, lng, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a705afa23bbe053945ab6bebe7a051ed&query='+lat + ',' + lng
    request({url:url, json:true}, (error, {body})=>{
        if(error){
            callback('unable to connect to weatherstack api')
        }else if(body.error){
            callback('unable to find your location, try again')
        }else{
            callback(undefined, body.current.weather_descriptions + 'it is curently ' + body.current.temperature + ' degree the cloud cover is ' + body.current.cloudcover)

        }
    })
}



module.exports = forecast
