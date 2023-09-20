const express = require('express');
const bodyParser = require('body-parser');
const { sequelize } = require('./models')

const config = require('./config/config')

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require('./route')(app)

app.get('/status', function (req, res) {
    res.send('Hello nodejs server belonging to jaruda');
});

app.get('/hello/:name', function (req, res) {
    console.log('hello - ' + req.params.name);
    res.send('Say hello with ' + req.params.name);
});

app.post('/hello', function (req, res) {
    res.send('OK you post' + req.params.name);
});

let port = process.env.PORT || config.port;

sequelize.sync({ force: false }).then(() => {
    app.listen(port, function () {
        console.log('Server running on ' + port)
    })
})

