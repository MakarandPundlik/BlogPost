const express = require('express');
const mongoose = require('mongoose');
const Router = require('./routes/Router');
const mongoURI = require('./config/Keys').mongoURI;
const bodyParser = require('body-parser');
const cors = require('cors');

//initiated app()
const app = express();

//middleware for database / mongodB atlas 
try {
    mongoose.connect( mongoURI, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log('connected to the database successfully'));    
    }catch (error) { 
    console.log("could not connect");    
    }
//global promise overriding
mongoose.Promise = global.Promise;

//bodypaerser middleware
app.use(bodyParser.json());


//cors middleware
app.use(cors());

//handling requests middleware
app.use('/',Router);



//error middleware
app.use((err,req,res,next)=>{
    //console.log(err.message);
    res.status(422).send({
        err:err.message
    })
});

const port = 2000 || process.env.port;
app.listen(port,()=>{
    console.log(`connected to the port ${port} successfully`);
});
