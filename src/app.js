const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode')
const forcast = require('./utils/forcast');

const app = express();

/* Define path for express config */
const pubicDirectoryPath = path.join(__dirname, '../public');
const viewPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

/* Setup handlebars engine and view location */
app.set('view engine', 'hbs');
app.set('views', viewPath);
hbs.registerPartials(partialsPath);

/* Setup ststic directory to serve */
app.use(express.static(pubicDirectoryPath));

app.get('/', (req, res) => {
    res.render('index', {
        title: 'Welcome to Home/Index page...!!!',
        name: 'Himanshu'
    });
});

app.get('/help', (req, res) => {
    // res.send('<h1>Help Page...JS</h1>');
    res.render('help', {
        title: 'Help Page....',
        content: 'Happy to hepl you ...',
        name: 'Himanshu'
    })
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Himanshu',
        age: 25
    });
});

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address !!!'
        });
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error });
        } 
        
        forcast(latitude, longitude, (error, forcastResponse) => {
            if(error){
                return res.send(error);
            }
            return res.send({
                forcast: forcastResponse,
                location,
                address: req.query.address
            });
        });

    });

    // res.send({
    //     forcast: 'It is raining.',
    //     location: req.query.address
    // });
});

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 404,
        name: 'Himanshu',
        errorMessage: 'Help article not found...'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found !!!',
        name: 'Himanshu'
    })
});

app.listen(3000, () => {
    console.log('Server is up and listining on prot 3000');
});