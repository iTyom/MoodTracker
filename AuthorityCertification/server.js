const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const app = express();
const port = 8004;
const authRouter = require('./src/controllers/auth.controller')

/* app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}) */
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use(cors());


app.use('/auth', authRouter)

app.listen(port, () => {
    console.log('--------------------SERVER INITIALIZED--------------------');
    console.log('-----------------------PORT : ' + port + '------------------------');
});