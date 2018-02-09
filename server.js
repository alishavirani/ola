const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const path = require('path');
const redis = require('redis');
const dbWrapper = require('./helpers/dbWrapper');
const config = require('./config/development.json');

const url = config.db.mongoip;

let client = redis.createClient();

client.on('connect', () => {
    console.log('Connected to Redis');
});

var app = express();

app.set('views', path.join(__dirname, 'views'));

app.engine('handlebars', exphbs({defaultLayout: 'main', extname: '.handlebars'}));
app.set('view engine', 'handlebars');

//exphbs.registerPartials(__dirname + '/views/partial');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// app.get('/', (req, res, next) => {
//     res.render('home');
// });

dbWrapper.connect(url, (err, res) => {
    if (err) {
        console.log('Error in connection', err);
    } else {
        console.log('COnnected successfully', res);
    }
});


require('./routes').router(app);


app.listen(config.port, () => {
    console.log('Server is running on port ',config.port);
});

module.exports = app;
module.exports = client;