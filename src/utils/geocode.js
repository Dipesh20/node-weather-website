const request = require('request')
const geocode = (adress,callback)=>{
    const key = 'pk.eyJ1IjoiZGlwZXNoMTIzNCIsImEiOiJjazgzZWh1M3AxN25mM2xydWhyOXVub2RnIn0.TcGg1yICriISTmLVOo2JHw'
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(adress) +'.json?access_token='+ key +'&limit=1'
    request({ url , json:true },(error,{body})=>{
        if(error)
        {
            callback('Unable to connect to weather Service!!',undefined)
        }
        else if(body.features.length == 0)
        {
            callback("Unable to Find",undefined)
        }
        else
        {
            callback(undefined,{
                latitude:body.features[0].center[0],
                longitude:body.features[0].center[1],
                place:body.features[0].place_name
            })
        }
    })

}

module.exports = geocode