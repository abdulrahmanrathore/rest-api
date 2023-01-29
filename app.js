const express = require('express');
const app = express();
const studentRoute = require('./api/routes/students');
const facultyRoute = require('./api/routes/faculty');
const productRoute = require('./api/routes/product');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://user:codeforinterview@sbs.03wzmgb.mongodb.net/?retryWrites=true&w=majority');

mongoose.connection.on('error', error => {
    console.log('connection failed');
})

mongoose.connection.on('connected', connected => {
    console.log('connected with database...');
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/student', studentRoute);
app.use('/faculty', facultyRoute);
app.use('/product', productRoute);


//sending error message for bad url request
app.use((req, res, next) => {
    res.status(404).json({
        error:'bad request'
    })
})

module.exports = app;