const express = require('express');
const router = express.Router();
const path = require('path');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


router.use(function (req, res) {
    res.status(404).json({
        error: true,
        message: 'Not Found'
    });
});


app.use(express.static(__dirname));

app.get('/', function (req, res) {
    res.render('index.html');
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
    console.log('Server', process.pid, 'listening on port', app.get('port'));
});

module.exports = app;

