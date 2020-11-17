const express = require('express');
    cors = require('cors');
    const bodyParser = require('body-parser');

const Router = require('./routes/userrouter');
const app = express();

//bodyparser middleware
app.use(bodyParser.json());
//Router middleware
app.use('/',Router);
const port = 2020 || proccess.env.port;

app.listen(port,()=>console.log(`connected to the port ${port} successfully`));
