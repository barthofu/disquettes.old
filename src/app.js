const createError           = require('http-errors'),
      express               = require('express'),
      path                  = require('path'),
      cookieParser          = require('cookie-parser'),
      logger                = require('morgan'),
      passport              = require('passport'),
      session               = require('cookie-session'),
      LocalStrategy         = require('passport-local').Strategy,

      Account               = require('./models/User'),

      flash                 = require('./middleware/error/flash'),
      visitsCounter         = require('./middleware/counter/visitsCounter')

var app = express();

app.locals.title = "Disquette"
app.locals.version = "0.01"

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));


// Set keys for session
app.use(session({ keys: ['unebonnedisquette', 'labonnedisquette'] }));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

//Set strategy for passport
passport.use(new LocalStrategy(Account.authenticate()));

//passport.use(auth.createStrategy());
app.use(passport.session());

passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());


app.use(flash)

//Main routes

const indexRoute = require('./routes/index')
const apiRoute = require('./routes/api')
const webRoute = require('./routes/web')
const adminRoute = require('./routes/admin')
const authRoute = require('./routes/auth')

app.use(visitsCounter)

app.use('/admin', adminRoute)
app.use('/', indexRoute)
app.use('/api', apiRoute)
app.use('/web', webRoute)
app.use('/auth', authRoute)
    // catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
