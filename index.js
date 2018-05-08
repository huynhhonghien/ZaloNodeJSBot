'use strict'

const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();

app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// Process application/json
app.use(bodyParser.json())

// for Zalo verification
app.get('/webhook/', function (req, res) {
    console.log(req.query);
    switch (req.query.event) {
        //when user chat with your OA
        case 'sendmsg':
            let message = req.query.message;
            switch (message) {
                case 'hello':
                    replyMessage(req.query.fromuid);
                    break;
                case 'send image':
                    replyImage(req.query.fromuid);
                    break;
            }
    }
    res.sendStatus(200);
})

// Spin up the server
app.listen(app.get('port'), function () {
    console.log('running on port', app.get('port'))
})