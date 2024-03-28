const express = require('express');
const bodyParser = require('body-parser');
const expressjsLayout = require('express-ejs-layouts');
const userRoute = require('./routes/userroutes');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');

const staticpath = path.join(__dirname,"public");


const app = express();
const port = 5000;

mongoose.connect('mongodb://localhost:27017/quikclassified');

app.use(express.static(staticpath));
app.use(session({
    secret:'testkey',
    resave:true,
    saveUninitialized:true
}));
app.use(flash());
app.use(expressjsLayout);
app.use(bodyParser.urlencoded({extended:false}));
app.use('/',userRoute);

app.set('layout','./layout/main.ejs');
app.set('view engine','ejs');

app.listen(port,()=>{
    console.log(`Server running ${port}`);
});

