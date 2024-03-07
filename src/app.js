const geocode = require('./utils/geocode')
const forecast = require('./utils/weatherstack')
const path = require('path')
const express = require('express')
const hbs = require('hbs')

const app = express()

// Define path for Express config
const publicDirectoryPath = (path.join(__dirname, '../public/'))
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setting up handlebars engine and the views path
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title : 'Weather',
        name: 'Arash Shalchian'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'about',
        name: 'Arash Shalchian'
    })
})

app.get('/help', (req,res) => {
    res.render('help', {
        title: 'help',
        name: 'Arash Shalchian',
        helptext: "Here is some help text."
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Arash Shalchian',
        errormessage: 'Help Article Not Found! '
    })
})

app.get('/weather', (req,res) => {
    if (!req.query.address){
        return res.send({
            error: 'Please provide an address! '
        })
    }
    
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error) {
            return res.send({ error })
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if (error){
                return res.send({ error })
            }
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })

   
})

app.get('/products', (req,res) => {
    if (!req.query.search){
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'Arash Shalchian',
        errormessage: 'Page Not Found! '
    })
})
app.listen(3000, () =>{
    console.log("Server is up on port 3000.")
})
