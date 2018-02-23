const dbWrapper = require('./helpers/dbWrapper');
const config = require('./config/development.json');

const url = config.db.mongoip;
const init = require('./server/init');

let app = init.express();

let connections = {router: app};
app.set('depInject', connections);

app.set('views', init.path.join(__dirname, 'views'));

app.engine('handlebars', init.exphbs({defaultLayout: 'main', extname: '.handlebars'}));
app.set('view engine', 'handlebars');

//app.use(init.express.static(init.path.join(__dirname, 'public')));
app.use(init.bodyParser.json());
app.use(init.bodyParser.urlencoded({extended: true}));

dbWrapper.connect(url, (err, res) => {
    if (err) {
        console.log('Error in connection', err);
    } else {
        console.log('Connected successfully', res);
    }
});

require('./routes').router(app);

app.listen(config.port, () => {
    console.log('Server is running on port ',config.port);
});

module.exports = app;
