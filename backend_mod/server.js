const express = require('express');
    cors = require('cors');
const app = express();

const port = 2020 || proccess.env.port;

app.listen(port,()=>console.log(`connected to the port ${port} successfully`));
