const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const Router = require('./routes/userrouter');
const app = express();

//database connectivity
mongoose.connect(process.env.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('connected to the database successfully'))
  .catch((err) => console.log(err));

//cors middleware
app.use(cors({
  origin:["*"]
}));
// app.use(cors({
//   origin:["http://localhost:3000","http://192.168.0.86:3000"],
//   optionsSuccessStatus:200,
//   credentials:true,
//   allowHeaders:["sessionId","Content-Type"],
//   exposedHeaders:["sessionId"]
// }));

//cookieparser middleware
app.use(cookieParser());

//bodyparser middleware
app.use(bodyParser.json());

//Router middleware
app.use('/', Router);

const port = 2020 || proccess.env.port;

app.listen(port, () => console.log(`connected to the port ${port} successfully`));
