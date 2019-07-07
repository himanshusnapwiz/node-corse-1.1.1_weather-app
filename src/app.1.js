const path = require('path');

const express = require('express');

// console.log(__dirname);
// console.log(__filename);
// console.log(path.join(__dirname, '../public'));

const app = express();

const pubicDirectoryPath = path.join(__dirname, '../public');

app.use(express.static(pubicDirectoryPath));    

app.get('/', (req, res) => {
    // res.write('Hello Express !!!');
    // res.write('This is write method');
    res.send('This is send method');
});

app.get('/help', (req, res) => {
    res.send('<h1>Help Page...</h1>');
});

app.get('/weather', (req, res) => {
    res.send('Weather app....');
});

app.get('/about', (req, res) => {
    res.send({
        name: 'Himanshu',
        age: 25
    });
});

app.listen(3000, () => {
    console.log('Server is up and listining on prot 3000');
});