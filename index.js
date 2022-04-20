const puppeteer = require('puppeteer');
const path = require("path");
const fs = require("fs");

const newdate = new Date().toLocaleString('en-US', {
    timeZone: 'America/Bogota'
});


(async() => {

    const express = require('express')
    const cors = require('cors')
    const app = express()
    const port = 3026

    app.use(cors()) // usnado cors para mejorar el rendimiento del app

    var server = app.listen(port, function() {
        console.log('Ready on port %d', server.address().port);
    });


    app.get('/', (req, res) => {
        res.send('Hello API CAM4.com! \n ' + server.address().port)
    })
    app.get('/dolar', (req, res) => {
        res.send('Dolar API CAM4.com!')
    })
    app.get('/rooms', (req, res) => {
        res.send('Rooms API CAM4.com!')
    })
    app.get('/cbhrs', (req, res) => {
        res.send('cb hrs API CAM4.com!')
    })

    console.log("APP Node APi Dolar - rooms - crbs");


})();