const express = require('express');
    cors = require('cors');

const Router = require('./routes/userrouter');
const app = express();

//Router middleware
app.use('/',Router);
const port = 2020 || proccess.env.port;

app.listen(port,()=>console.log(`connected to the port ${port} successfully`));
