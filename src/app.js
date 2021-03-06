const path = require('path')
const express = require('express')
const hbs = require("hbs")
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')



app.use(express.static(publicDirectoryPath))
app.set('view engine', 'hbs');
app.set('views', viewsDirectoryPath);

app.get('/', (req, res)=>{
    res.render('index',
    {title:'weather app', name: 'camlus'})
})

app.get('/about', (req, res)=>{
    res.render('about',
     {title:'about page', name: 'camlus'})
})
app.get('/help', (req, res)=>{
    res.render('help', 
    {title:'help page', name: 'camlus'})
})

app.get('/weather', (req, res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error:error})
        }

        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error:error})
            }

            res.send({
                forecast:forecastData,
                location: location,
                address: req.query.address
            })
            
        })
    })
    
})

app.get('*', (req, res)=>{
    res.render('404.hbs')
})

app.listen(port, ()=>{
    console.log("server is up on port " + port)
})