const request = require('request')


const geocode =(address, callback)=>{
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2FtbHVzIiwiYSI6ImNrOXI2MTAzMTA5d2IzZ3Foczg1MmY4dzEifQ.zc3VIhbKKcOgGPDhA58W_A&limit=1'
    request ({url: url, json:true}, (error, {body})=>{
        if(error){
            callback('unable to connect to the location services mapbox, check internet', undefined)
        }else if(body.features.length ===0){
            callback('unable to connect to location services', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name

            })
        }
    })
}

module.exports = geocode